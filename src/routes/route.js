const express=require('express');
const router=express.Router();

const userController=require('../controllers/userController');
const productController=require('../controllers/productController');
const orderController=require('../controllers/orderController');
const { middleware } = require('../middleware/middleware');

router.post('/createUser',middleware,userController.createUser);
router.post('/createOrder',middleware,orderController.createOrder);
router.post('/createProduct', productController.createProduct);

module.exports=router;