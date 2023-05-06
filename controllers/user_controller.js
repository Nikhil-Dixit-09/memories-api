const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const User=require('../models/user')
module.exports.signin=async function(req,res){
    const {email,password}=req.body;
    console.log
    try{
        const existingUser=await User.findOne({email});
        if(!existingUser){
            return res.staus(404).json({message:"User does not exist"})
        }
        const isPasswordCorrect=await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"1h"});
        return res.status(200).json({result:existingUser,token})

    }catch(err){
        console.log(err);       
        return res.status(500).json({message:"Something went wrong"});
    }
}
module.exports.signup=async function(req,res){
    try{
        const {email,password,firstName,lastName,confirmPassword}=req.body;
        try{
            const existingUser=await User.findOne({email});
            if(existingUser) return res.status(400).json({message:"User already exists"});
            if(password!=confirmPassword){
                return res.status(400).json({message:"Passwords don't match"});
            }
            const hashedPassword=await bcrypt.hash(password,12);
            const result=await User.create({email,password:hashedPassword,name:`${firstName} ${lastName}`});
            const token=jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"1h"});  
            return res.status(200).json({result,token}); 
        }catch(err){

        }
    }catch(err){
        console.log(err);
    }
}