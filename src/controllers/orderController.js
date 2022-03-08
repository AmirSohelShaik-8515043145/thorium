const orderModel=require('../models/orderModel');
const productModel=require('../models/productModel');
const userModel = require('../models/userModel');

const createOrder=async function(req,res){
   let productId = req.body.Product;
   let userId = req.body.User;
   let product = await productModel.findById(productId);
   let user = await userModel.findById(userId);
   if(!product && !user){
      res.send({msg :"Invalid product id and user id"});
      return;
     }
   if(!product){
    res.send({msg :"Invalid product id"});
    return;
   } 
   if(!user) {
       res.send({msg :"Invalid user id"});
       return;
   }
   let orderDetails;
   let userDetails;
   if(req.headers.isfreeappuser == "true"){
     orderDetails =await orderModel.create({
      "Product":productId,
      "User":userId,
      "amount": 0,
      "date": req.body.date,
      "isFreeUserApp":true
     });
     res.send({OrderDetails : orderDetails})
   }else{
      
      if(user.balance > req.body.amount){
      orderDetails =await orderModel.create({
         "Product":productId,
         "User":userId,
         "amount": req.body.amount,
         "date": req.body.date,
         "isFreeUserApp":false
        });
        userDetails = await userModel.findOneAndUpdate(
           {_id : userId},
           {$inc:{"balance":-1*(req.body.amount)}},
           {new : true}

        );
        res.send({OrderDetails : orderDetails,UserDetails :userDetails})
        }
        else{
           res.send({Error:"User has insufficient balance"})
        }
   }
   
    
}
module.exports.createOrder=createOrder;
