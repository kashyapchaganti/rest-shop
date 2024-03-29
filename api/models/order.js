const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product', required:true
    },
    quantity: {type: Number, default:1}
},{_id:true})

module.exports = mongoose.model('Order',orderSchema)