const express = require('express')
const router = express.Router();
const Product = require('../models/product')
const mongoose = require('mongoose')
const multer = require('multer')
const upload = multer({dest:'uploads/'})
const checkAuth= require('../../middleware/checkAuth')


router.get('/',async (req,res,next)=>{
    try{
        const prods= await Product.find()
        res.status(200).json({products: prods})
        
    }catch(err){
        res.status(500).json({
            message: "fail"
        })
    }
})

router.post('/', upload.single('productImg'),checkAuth, async (req,res,next)=>{

    try{
        const prod = new Product({
            name:req.body.name,
            price: req.body.price
        });
        await prod.save();
        console.log(prod)
        res.status(200).json({
            message:"created prod",
            product:prod
        })
        

    }catch(err){
        console.log(err)
        res.status(400).json({
            message:'fail',
            error:err
        })
    }
})

router.patch("/:productId",async(req,res,next)=>{
    const id =req.params.productId;
    
    try{
        const prod = await Product.findByIdAndUpdate(id,{$set:req.body},{new:true})
        if(!prod){
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            message: 'Product updated',
            product: prod
          });


    }catch(err){
        res.status(500).json({ message: 'Error updating product', error: err });

    } 
})

router.get("/:id", async (req,res,next)=>{
    try{
        const prod = await Product.findById(req.params.id);
        res.status(200).json({
            message: "Success",
            prod: prod
        })
    }catch(err){
        res.status(404).json({
            message: "There is an error",
            error: err
        })
    }
})

module.exports =router;