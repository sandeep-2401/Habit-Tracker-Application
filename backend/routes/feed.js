const {userFeed,chart,userDetails} = require('../controllers/feedController')
const auth = require('../middleware/auth')

const express = require('express')
const router = express.Router()

router.get('/all',auth, userFeed)
router.get('/chart',auth,chart)
router.get('/me',auth,userDetails)

module.exports = router