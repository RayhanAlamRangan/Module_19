

const express=require('express');

const router=express.Router();

const UserController=require('../Controllers/User.Controller');
const AuthVerifyMiddleware=require('../Middlewars/AuthVerifyMiddleware');
const TaskController=require('../Controllers/Task.Controller');

const ProductController=require('../Controllers/ProductsController');


//Update
router.post('/UpdateProfile',AuthVerification,UserController.UpdateProfile)



// User Manage

router.post('/registration', UserController.registration);
router.post('/login',UserController.login);
router.get('/profiledetails',  AuthVerifyMiddleware, UserController.profileDetails);
router.post('/profileUpdate',AuthVerifyMiddleware, UserController.profileUpdate);

router.get('/RecoverVerifyEmail/:email',  UserController.RecoverVerifyEmail);
router.get('/RecoverVerifyOtp/:Email/:otp', UserController.RecoverVerifyOtp);
router.post('/RecoverResetPass',UserController.RecoverResetPass);



//Task Manage

router.post('/createTask',AuthVerifyMiddleware,TaskController.createTask);
router.get('/deleteTask/:id',AuthVerifyMiddleware, TaskController.deleteTask);

// create Product

router.post('/createProduct', ProductController.createProduct);
// readProduct
router.get('/readProducts', ProductController.readProducts);
// Update Product
router.post('/updateProduct/:id', ProductController.updateProduct);
// delete Product
router.get('/deleteProduct/:id', ProductController.deleteProduct);
















module.exports=router;