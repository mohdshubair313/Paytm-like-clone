const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/paytm");

// create a user schema thah how it looks like
const userschema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastname: String
})

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance:{
        type: Number,
        required: true,
    }
})

// model banana hai for the schema 
const User = mongoose.model('User', userschema);
const Account = mongoose.model('Account', paymentSchema);

module.exports = {
    User,
    Account
};

