const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_TOKEN = process.env.JWT_TOKEN

const {logbody,regbody} =require('../middleware/validate')
const User = require('../model/user')

const register = async(req,res)=>{
    const response = regbody.safeParse(req.body)
    if(!response.success){
        return res.status(411).json({
            msg : 'invalid input'
        })
    }
    
    const exist = await User.findOne({
        email : req.body.email
    })

    if(exist){
        res.status(411).json({
            msg : 'user already exist'
        })
    }

    const user = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : req.body.password,
        bio : req.body.bio,
    })

    const userId = user._id

    const token = jwt.sign({userId},JWT_TOKEN)

    res.json({
        msg : 'user created successfully',
        token : token
    })

}

const login = async(req,res)=>{

    const response = logbody.safeParse(req.body)
    if(!response.success){
        res.status(411).json({
            msg : 'invalid input'
        })
    }

    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email,
        password
    })

    if(user){
        const token = jwt.sign({userId : user._id},JWT_TOKEN)
        res.status(200).json({
            token : token
        })
    }
    else{
        res.status(411).json({
            msg : "unable to find such user...check your credentials"
        })
    }

}

module.exports = {
    register,
    login
}