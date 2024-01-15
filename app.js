const express = require('express')
const productRoutes = require('./api/routes/products')
const orderRoutes= require('./api/routes/orders')
const userRoutes= require('./api/routes/users')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config();

app.use(morgan('dev')) // req logging 
app.use(express.json())
mongoose.connect('mongodb+srv://kashyapchaganti96:'+process.env.MONGO_ATLAS_PWD+'@cluster0.t9lqaa8.mongodb.net/?retryWrites=true&w=majority')
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',userRoutes);


app.use((req,res,next)=>{
    const error = new Error('Not Found')
    error.status=400
    next(error)
})

app.use((error, req,res,next)=>{
     res.status(error.status || 500)
     res.json({
        error: {
            message:error.message
        }
     })
})

module.exports =app;