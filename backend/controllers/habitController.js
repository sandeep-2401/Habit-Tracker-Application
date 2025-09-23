const env = require('dotenv');
env.config()

const Habit = require('../model/Habit.js')
const {createTask} = require('../middleware/validate.js')


const addHabit = async(req,res)=>{
    const response = createTask.safeParse(req.body)
    if(!response.success){
        return res.status(411).json({
            msg : 'Enter valid input for adding a habit'
        })
    }

    const newHabit = await Habit.create({
        userId : req.body.userId,
        title : req.body.title,
        description : req.body.description
    })

    if(newHabit){
        return res.status(200).json({
            msg : "habit added successfully"
        })
    }

    res.status(411).json({
        msg : 'error adding habit into db "habitcontroller.js"'
    })

}

const findHabit = async(req,res)=>{
    const id = req.body.userId;
    const allHabits = Habit.findOne({
        userId : id,
    })

    if(!allHabits){
        return res.json({
            msg : "unable to find any habits"
        })
    }
    res.status(200).json({
        
    })
}

module.exports = {
    addHabit,
}