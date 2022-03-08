const productModel=require('../models/productModel');

const createProduct= async function(req,res){
    let productData=await productModel.create(req.body);
    res.send({ProductDetails:productData});
}

module.exports.createProduct=createProduct;