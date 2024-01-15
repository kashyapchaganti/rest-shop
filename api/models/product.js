const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    price: {type: Number,
        required: true
}}, {_id:true})

module.exports= mongoose.model('Product', productSchema)