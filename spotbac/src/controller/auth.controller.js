const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function registerUser(req, res) {
    const { username, email, password, role = "user" } = req.body;

    const isuserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isuserAlreadyExists) {
        return res.status(409).json({
            message: "user already exists"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        role
    });

    const token = jwt.sign(
        {
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
        message: "user registered successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}
async function loginUser(req,res){
    const{username,email,password}=req.body;
    const user=await userModel.findOne({
        $or:[
            {username},{email}
        ]
    })
    if (!user){
        return res.status(401).json({
            message:"invalid user credentials"
        })
    }
    const isPasswordValid= await bcrypt.compare(password,user.password)
   if(!isPasswordValid){
    return res.status(401).json({
        message: "invalid user credentials"
    })
   } 
   const token =jwt.sign({
    id:user._id,
    role:user.role,
   },process.env.JWT_SECRET)
   res.cookie("token", token); 
   res.status(200).json({
    message:"user loged sucessfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email,
      role:user.role,
    }
   })
}
async function logoutUser(req,res){
   res.clearCookie("token")
   res.status(200).json({
    message:"user logged out sucessfully"
   }) 
}

module.exports = { registerUser,loginUser,logoutUser };