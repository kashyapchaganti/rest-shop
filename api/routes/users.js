const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


router.post('/signup', async(req, res, next)=>{
    try{
        const hash  = await bcrypt.hash(req.body.password,10)
        const user = new User(
            {
                email: req.body.email, 
                password:hash
            }
        )
        await user.save()
        res.status(200).json({
            message: "Success",
            user:user
        })
    }catch(err){
            res.status(500).json({
                error:err
            })
    }
})

router.post('/login', async (req,res,next)=>{
    try{
        const users= await User.find({email:req.body.email})
        users.map(async user=>{
            if(user.length<1){
                return res.status(404).json({
                    message: "Auth Failed"
                })
            }
            if(await bcrypt.compare(req.body.password, user.password)){
                const jsonwebtoken=  jwt.sign({
                    user:req.body.email,
                    id:user.id
                }, process.env.SECRET)
                res.status(200).json({
                    message:'Success',
                    jsonwebtoken:jsonwebtoken
                })
            }else{
                res.status(500).json({
                    message:"Wrong Password"
                })
            }
        })

    }catch(err){
        res.status(500).json({
            error:err
        })
    }
})

module.exports = router