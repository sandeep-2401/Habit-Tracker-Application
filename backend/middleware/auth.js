const jwt = require('jsonwebtoken')
const JWT_TOKEN = process.env.JWT_TOKEN

const usermiddleware = async(req,res,next)=>{
    let token = req.headers.authorization

    if (!token){
        res.status(403).json({
            msg : 'invalid authorization header'
        })
    }

    token = token.split(" ")[1];

    try {
        const verified = jwt.verify(token,JWT_TOKEN)
        req.userId = verified.userId
        next()
    }

    catch(err){
        res.status(403).json({
            msg : `error verifying headers ${verified.userId}`
        })
    }
}

module.exports = usermiddleware