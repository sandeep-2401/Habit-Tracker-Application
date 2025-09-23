const mongoose = require('mongoose')

const habitSchema = new mongoose.Schema(
{
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        trim : true
    },
    streak : {
        type : Number,
        default : 0
    },
    longestStreak : {
        type : Number,
        default : 0
    },
    history : [
        {
        date : {
            type : Date,
            required : true
            },
        
        completed : {
            type : Boolean,
            default : true,
            }
        }
    ]
},
{timestamps : true}
)

const Habit = mongoose.model('Habit',habitSchema)

module.exports = Habit