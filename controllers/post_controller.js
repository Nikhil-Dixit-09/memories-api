const { default: mongoose } = require('mongoose');
const PostMessage=require('../models/postMessage');
//gfcxfhdcfhc
module.exports.forward=async function (req,res){
    try{
        const postMessages=await PostMessage.find();
        // console.log('hi',postMessages);
        return res.status(200).json(postMessages);
    }catch(err){
        return res.status(404).json({message: err.message});
    }
}
module.exports.create=async function(req,res){
    try{
        // console.log('hi',req.body);
        const post=await PostMessage.create({title:req.body.title,message:req.body.message,creator:req.userId,tags:req.body.tags,selectedFile:req.body.selectedFile,name: req.body.name});
        console.log(post);
        return res.status(200).json(post);
    }catch(err){
        return res.status(404).json({message:err.message});
    }
}
module.exports.update=async function(req,res){
    try{
        const id=req.params.id;
        const post=req.body;
        
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json("Not a valid id");
        }
        const data=await PostMessage.findByIdAndUpdate(id,post,{new: true});
        // console.log(data);
        return res.status(200).json(data);

    }catch(err){
        return res.status(404).json({message:err.message});
    }
}
module.exports.delete=async function(req,res){
    try{
        const id=req.params.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json("Not a valid id");
        }
        await PostMessage.findByIdAndRemove(id);
        return res.status(200).json(id);
    }catch(err){
        return res.status(404).json({message:err.message});
    }
}
module.exports.like=async function(req,res){
    try{
        
        const id=req.params.id;
        // console.log(id,'ffff');
        // console.log('hiiiiii')
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json("Not a valid id");
        }
        // console.log('hii');
        const oldPost=await PostMessage.findById(id);
        const index=oldPost.likes.findIndex((id)=> id===String(req.userId));
        if(index===-1){
            oldPost.likes.push(req.userId);
        }else{
            oldPost.likes=oldPost.likes.filter((id)=>id!=String(req.userId));
        }
        const post=await PostMessage.findByIdAndUpdate(id,oldPost,{new:true});
        return res.status(200).json(post);
    }catch(err){
        console.log(err);
        return res.status(404).json({message:err.message});
    }
}