const express = require("express");
const router = express.Router();
const {authMiddleware} = require("../middleware");
const {Account} = require('../db')

module.exports = router;

// payment Route for accessing the balance of the user
router.get("/balance" , authMiddleware , async (req, res, next) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
})

router.post("/transfer", authMiddleware , async (req,res) => {
    const session = await create.startSession();
    session.startTransaction();
    const {amount, to} = req.body;

    // first fetch the account of the user and then check if they have the sufficient balance to transfer the money to someone
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient Balance"
        });
    }

    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        });
    }

    //perform the transfer
    await Account.updateOne({userId: req.userId}, {$inc: {balance: -amount }}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: amount}}).session(session)

    // commit the transfer of the transactions
    await session.commitTransaction();

    res.json({
        message: "Transactions Succesfully"
    });
});