const {userFeed,dailyFeed,weeklyFeed,monthlyFeed} = require('../controllers/feedController')
const auth = require('../middleware/auth')

const express = require('express')
const router = express.Router()

router.get('/all',auth, userFeed)
router.get('/daily',auth,dailyFeed)
router.get('/weekly',auth,weeklyFeed)
router.get('/monthly',auth,monthlyFeed)

module.exports = router