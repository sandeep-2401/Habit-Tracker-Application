const env = require('dotenv');
env.config()
const mongoose = require('mongoose');
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
        userId : req.userId,
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
    const id = req.userId;
    const allHabits = await Habit.find({
        userId : id,
    })

    if(!allHabits){
        return res.json({
            msg : "unable to find any habits"
        })
    }
    res.status(200).json({
        habits : allHabits
    })
}

const markHabitComplete = async(req,res)=>{
    const habitId = req.params.id;
    const id = req.userId;

    const habit = await Habit.findOne({
        userId : id,
        _id : habitId
    })

    if(!habit){
        return res.json({
            msg : "unable to find the specifed habit"
        })
    }

    const today = new Date().toDateString()
    const lastEntry = habit.history[habit.history.length -1];
    const lastDate = lastEntry ? lastEntry.date.toDateString() : null;

    if(lastDate == today){
        return res.json({
            msg : "Habit already completed today",habit
        })
    }

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate === yesterdayStr){
        habit.streak = (habit.streak || 0) +1;
    }
    else{
        habit.streak = 1;
    }

    habit.longestStreak = Math.max(habit.longestStreak || 0 , habit.streak)

    habit.history.push({
        date : new Date(),
        completed : true
    })

    await habit.save();

    res.json({
        msg : "Habit marked complete", habit
    })
}

const findOneHabit = async (req,res)=> {
    const userId = req.userId;
    const habitId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        return res.status(400).json({ msg: "Invalid habit ID" });
    }

    const habit = await Habit.findOne({
        userId,
        _id : habitId
    })

    if(!habit){
        return res.status(404).json({
            msg : "Could not find the habit"
        })
    }

    res.json({
        msg : "habit found", habit
    })
}

const deleteHabit = async(req,res)=>{
    const userId = req.userId
    const habitId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        return res.status(400).json({ msg: "Invalid habit ID" });
    }

    const deletedHabit = await Habit.findOneAndDelete({
        userId,
        _id : habitId
    })

    if(!deletedHabit){
        return res.status(404).json({
            msg : " could not find such habit"
        })
    }

    res.status(200).json({
        msg : 'habit deleted successfully', deletedHabit
    })
}

const updateHabit = async(req,res)=>{
    const userId = req.userId
    const habitId = req.params.id
    const {title,description} = req.body

    if (!mongoose.Types.ObjectId.isValid(habitId)) {
        return res.status(400).json({ msg: "Invalid habit ID" });
    }

    const updatedField = {}
    if (title) updatedField.title = title
    if (description) updatedField.description = description

    const updatedHabit = await Habit.findOneAndUpdate(
        { userId, _id : habitId },
        { $set : updatedField},
        { new: true, runValidators: true}
    )

    if(!updatedHabit){
        return res.status(404).json({
            msg : "habit not found"
        })
    }

    res.json({
        msg : "habit updated successfully",
        habit : updatedHabit
    })   
}

module.exports = {
    addHabit,
    findHabit,
    markHabitComplete,
    findOneHabit,
    deleteHabit,
    updateHabit
}

