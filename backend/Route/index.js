const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const AccountRouter = require("./account");

router.use("/user",userRouter);
router.use("/payment", AccountRouter);
module.exports = router;
