/*const express=require('express');
const authController=require("../controller/auth.controller");
const authroutes=express.Router();
authroutes.post('/register',authController.registerUser);
authroutes.post('/login',authController.loginUser)
authroutes.post('/logout',authController.logoutUser)
module.exports=authroutes; */
const express = require('express');
const authController = require("../controller/auth.controller");

const {
    registerValidation,
    loginValidation,
    validate
} = require("../validations/auth.validation");

const authroutes = express.Router();

// Register User
authroutes.post(
    '/register',
    registerValidation,
    validate,
    authController.registerUser
);

// Login User
authroutes.post(
    '/login',
    loginValidation,
    validate,
    authController.loginUser
);

// Logout User
authroutes.post(
    '/logout',
    authController.logoutUser
);

module.exports = authroutes;