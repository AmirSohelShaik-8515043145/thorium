

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema( {
    name:String,
	category:{
        type:String,
        enum:["book","toy","clothing","electronics"]
    },
	price:{
        type:Number,
        require:true
    }
},{timestamp : true});

module.exports = mongoose.model('Product', productSchema)