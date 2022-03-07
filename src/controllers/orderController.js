const orderModel=require('../models/orderModel');
const productModel=require('../models/productModel');
const userModel = require('../models/userModel');

const createOrder=async function(req,res){
   let productId = req.body.Product;
   let userId = req.body.User;
   var product = productModel.findById(productId);
   var user = userModel.findById(userId);
   
//    let cP =0;
//    let cU=0;
//    product.count(function (err, count) {
//     if (err) console.log(err)
//     else cP= count;
//     });
//     user.count(function (err, count) {
//         if (err) console.log(err)
//         else cU= count;
//         });
   if(!product){
    res.send({msg :"Invalid product id"});
    return;
   } 
   if(!user) {
       res.send({msg :"Invalid user id"});
       return;
   }
   let orderDetails=await orderModel.create(req.body);
    res.send({msg : orderDetails})
}

module.exports.createOrder=createOrder;
