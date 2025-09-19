const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required : true,
            unique : true,
            trim : true,
            minlength : 3,
        },
        email : {
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase : true,
        },
        password : {
            type : String,
            required : true,
            minlength : 4,
        },
        bio : {
            type : String,
            maxlength : 120,
        },
    },
    {timestamps : true}
);

const User = mongoose.model('User',userSchema)

module.exports = User