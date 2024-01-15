const jwt = require('jsonwebtoken')

module.exports = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET)
        req.userData = decoded;
        next()
    }catch(err){
        res.status(400).json({
            message:"Auth Fail"
        })
    }
}
