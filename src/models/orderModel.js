const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    User:{
        type:ObjectId,
        ref : "User",
    },
    Product:{
        type:ObjectId,
        ref:"Product"
    },
    isFreeUserApp:{
        type:Boolean,
        default:false
    },
    amount: Number,
    date: String,
    },{timestamp : true});

module.exports = mongoose.model('Order', orderSchema)