const connectDB = require('./config/db')
const authRouter = require('./routes/auth')

const express = require('express')
const cors = require('cors')
const app = express()


app.use(cors())
app.use(express.json())
connectDB()

app.use('/api/auth',authRouter)



app.listen(3000,()=>{
    console.log('server running on port 3000');
})