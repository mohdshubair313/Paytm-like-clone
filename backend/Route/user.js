const express = require("express");
const router = express.Router();
const {SignupSchema,SigninSchema, updatebody} = require("./zodSchema");
const { User } = require("../db");
const { Account } = require("../db")
const { JWT_SECRET } = require('../config'); // Ensure the path is correct
const jwt = require("jsonwebtoken")
const {authMiddleware} = require("../middleware");

// sign up route for the signup page

router.post("/signup", async (req, res) => {
    const body = req.body;
    const { success } = SignupSchema.safeParse(body);
    
    //handling invalid input 
    if (!success) {
        return res.json({
            message: "Email already taken / Incorrect Inputs"
        }) 
    }
// check if the existing user is found or not
    const existingUser = await User.findOne({
        username: body.username
    })
    // if found than gave the message like this
    if (existingUser) {
        return res.json({
            message: "Email already taken"
        })
    }

    //Create new User and generate token
    const user = await User.create({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastname: body.lastname,
    });
    const userId = user._id;

    // Now create a payment account
    await Account.create({
        userId,
        balance: 1 + Math.random() * 4000
    })

    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.json({
        messge: "User has been created successfully",
        token: token
   })

})

router.post("/signin", async (req,res) => {
    const body = req.body;
    const {success} = SigninSchema.safeParse(req.body);

    if(!success) {
       return res.status(403).json({
            messsage:"Email already taken / invalid inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password,
    })

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)
        
        res.json({
            token:token
        })
        return
    }

    res.status(412).json({
        message: "Probelem in logging you so try to sign up again"
    })
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updatebody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

		await User.updateOne({ _id: req.userId }, req.body);
	
    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastname: { "$regex": filter, "$options": "i" } }
        ]
    });

    const response = {
        User: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastname: user.lastname,
            _id: user._id
        }))
    };

    console.log("Server Response:", response); // Log the response on the server-side
    res.json(response);
});


module.exports = router;