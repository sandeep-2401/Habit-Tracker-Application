const Habit = require('../model/Habit')

const userFeed = async(req,res)=>{
    const userId = req.userId

    const habits = await Habit.find({
        userId,
    })

    if(habits.length === 0){
        return res.status(404).json({
            msg : "unable to find any habits"
        })
    }

    const feed = habits.flatMap(habit =>
      habit.history
        .filter(entry => entry.completed === true)
        .map(entry => ({
          habitId: habit._id,
          title: habit.title,
          completedAt: entry.date
        }))
    );

    feed.sort((a,b)=> new Date(b.completedAt) - new Date(a.completedAt))

    res.status(200).json({
        msg : "List of completed habits", feed
    })
}

const dailyFeed = async(req,res)=>{
    const userId = req.userId

    let habits = await Habit.find({
        userId,
    })

    if(habits.length === 0){
        return res.status(404).json({
            msg : "unable to find any habits"
        })
    }

    const totalHabits = habits.length
    const today = new Date().toDateString()
    let completedHabits =0;

    habits.forEach(habit=>{
        habit.history.forEach(h => {
            const thisDate = new Date(h.date).toDateString()
            if(thisDate === today && h.completed === true){
                completedHabits +=1
            }
        })
    })

    res.json({
            totalHabits,
            completedHabits,
            date : today,
            completionRate: totalHabits === 0 ? 0 : Math.floor((completedHabits / totalHabits) * 100) + '%'
        }
    )
}

const weeklyFeed = async (req, res) => {
    try {
        const userId = req.userId;

        const habits = await Habit.find({ userId });

        if (habits.length === 0) {
            return res.status(404).json({
                msg: "Unable to find any habits" 
            });
        }

        const totalHabits = habits.length;

        const today = new Date();
        const firstDay = new Date(today);
        firstDay.setDate(today.getDate() - 7);
        firstDay.setHours(0, 0, 0, 0); 
        today.setHours(23, 59, 59, 999);

        let completedHabits = 0;

        habits.forEach(habit => {
            habit.history.forEach(entry => {
                const entryDate = new Date(entry.date);
                if (entryDate >= firstDay && entryDate <= today && entry.completed) {
                    completedHabits += 1;
                }
            });
        });

        const totalPossible = totalHabits * 7;

        res.status(200).json({
            range: `${firstDay.toDateString()} to ${today.toDateString()}`,
            totalPossible,
            completed: completedHabits,
            completionRate: totalPossible === 0 ? 0 : Math.floor((completedHabits / totalPossible) * 100)
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error while fetching weekly feed" });
    }
};

const monthlyFeed = async (req, res) => {
    const userId = req.userId;

    let habits = await Habit.find({ userId });

    if (habits.length === 0) {
        return res.status(404).json({
            msg: "unable to find any habits"
        });
    }

    const totalHabits = habits.length;

    let today = new Date();
    let firstDay = new Date(today);
    firstDay.setDate(firstDay.getDate() - 30);

    let completedHabits = 0;

    habits.forEach(habit => {
        habit.history.forEach(h => {
            const thisDate = new Date(h.date);
            if (thisDate >= firstDay && thisDate <= today && h.completed === true) {
                completedHabits += 1;
            }
        });
    });

    const totalPossible = totalHabits * 30;

    res.json({
        totalHabits,
        completedHabits,
        dateRange: `${firstDay.toDateString()} to ${today.toDateString()}`,
        completionRate: totalPossible === 0 
            ? "0%" 
            : Math.floor((completedHabits / totalPossible) * 100) + "%"
    });
};


module.exports ={
    userFeed,
    dailyFeed,
    weeklyFeed,
    monthlyFeed
}