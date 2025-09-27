const Habit = require('../model/Habit')
const User = require('../model/user')

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

const userDetails = async(req,res)=>{
  try{
    const id = req.userId;
    const result = await User.findById(id).select("-password")

    if(!result) res.status(404).json({
      user : "user not found"
    })

    res.json({
      user : result
    })
  }
  catch (err){
    res.status(500).json({
      error : "server error"
    })
  }
}

const chart = async (req, res) => {
  try {
    const userId = req.userId;
    const range = parseInt(req.query.range) || 7;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (range - 1));

    const habits = await Habit.find({ userId });

    const dailyCounts = [];
    for (let i = 0; i < range; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const formattedDate = date.toISOString().split('T')[0];
      dailyCounts.push({ date: formattedDate, completed: 0 });
    }

    let totalCompleted = 0;
    let totalPossible = 0;

    habits.forEach(habit => {
      const created = new Date(habit.createdAt);
      const habitStart = created > startDate ? created : startDate;
      const daysExisted = Math.floor((today - habitStart) / (1000 * 60 * 60 * 24)) + 1;
      totalPossible += daysExisted;

      const completedInRange = habit.history.filter(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate >= startDate && entryDate <= today && entry.completed;
      }).length;

      totalCompleted += completedInRange;

      habit.history.forEach(entry => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        if (entryDate >= startDate && entryDate <= today) {
          const idx = Math.floor((entryDate - startDate) / (1000 * 60 * 60 * 24));
          if (idx >= 0 && idx < range) {
            dailyCounts[idx].completed += 1;
          }
        }
      });
    });

    const categoryCounts = {};
    habits.forEach(habit => {
      const category = habit.category || "Uncategorized";
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    });

    const completionRate = totalPossible > 0 ? ((totalCompleted / totalPossible) * 100).toFixed(1) : 0;

    res.json({ dailyCounts, categoryCounts, totalHabits: habits.length, totalCompleted, totalPossible, completionRate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports ={
    userFeed,
    chart,
    userDetails
}