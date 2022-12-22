const mongoose = require("mongoose");
const {Schema} = mongoose
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
},{ strict: false });
const user = mongoose.model('user', UserSchema);
user.createIndexes();
module.exports = user;