const express = require('express')
const router = express.Router()
const Order = require('../models/order')
const Product = require('../models/product')


router.get("/", async(req,res,next)=>{
    try{
        const orders = await Order.find().populate('product');
        res.status(200).json({
            message: "here is the list",
            orders: orders
        })

        
    }catch(err){
        res.status(500).json({
            message: "ERROORRR"
        })
    }
})

router.post("/", async(req,res,next)=>{
    try{
        const {product, quantity}= req.body
        const orders = new Order({
            product: product,
             quantity: quantity})
        await orders.save().populate()
        res.status(200).json({
            message: "Posted",
            orders: orders
        })

        
    }catch(err){
        res.status(500).json({
            message: "ERROORRR",
            error:err
        })
    }
})


module.exports= router