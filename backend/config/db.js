const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();

const db_url = process.env.MONGO_URL

const connectDB = async()=>{
    try{
        await mongoose.connect(db_url)
        console.log('db connected sucessfully')
    }
    catch(err){
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB