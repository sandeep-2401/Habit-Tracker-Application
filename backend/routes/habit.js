const express= require('express')
const router = express.Router()

const {addHabit} = require('../controllers/habitController')

router.post('/addHabit',addHabit)

module.exports = router