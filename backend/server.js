const connectDB = require('./config/db')
const authRouter = require('./routes/auth')
const habitRouter = require('./routes/habit')
const feedRouter = require('./routes/feed')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
connectDB()

app.use('/api/auth', authRouter)
app.use('/api/habit', habitRouter)
app.use('/api/feed', feedRouter)

app.listen(3000,()=>{
    console.log('server running on port 3000');
})