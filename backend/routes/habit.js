const express= require('express')
const router = express.Router()

const {
    addHabit,
    findHabit,
    markHabitComplete, 
    findOneHabit,
    deleteHabit,
    updateHabit
} = require('../controllers/habitController')

const auth = require('../middleware/auth.js')


router.post('/add',auth,addHabit)
router.get('/view',auth,findHabit)
router.get('/:id/find',auth,findOneHabit)
router.patch('/:id/complete',auth,markHabitComplete)
router.patch('/:id/update',auth,updateHabit)
router.delete('/:id/delete',auth,deleteHabit)

module.exports = router