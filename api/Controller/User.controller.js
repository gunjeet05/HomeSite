import User from "../Model/User.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const user=(req, res)=>{
    res.json({
        message:"Kya haal hai"
    })
}


export const signin=async (req, res, next)=>{
    try{
    const {email , password}=req.body;
    const user=await User.findOne({email});
    if(!user){
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      
    }
     const pass=user.password;
    const checkPass=bcrypt.compareSync(password, user.password);
    if(!checkPass){
        const error = new Error("Password is incorrect");
        error.statusCode = 404;
        throw error;
       
    }
    const token=jwt.sign({
        "user_id":user._id,

    },
    process.env.secret,
    {
        expiresIn:"1h",
    }
    
    )
    const {password:pass2, ...restofThings}=user._doc;
    res.cookie("userToken",token,{httpOnly:true}).status(200).json(restofThings);
}
catch(err){
    next(err);
}
    
}




// export const addUser=(user)=>{
//     const newUser=new User({
//         username:user.username, 
//         password:user.password, 
//         email:user.email
//     })
//     newUser.save();

// }

export const googleLogin=async (req, res, next)=>{
    const {username, email, photo}=req.body;
    try{
    const user=await User.findOne({email});
        if(!user){
        const newUser=new User({
            username:username.split(" ").join("").toLowerCase(), 
            email:email, 
            password:Math.random().toString(36).slice(-8),
            picture:photo
        })
        const user1=await newUser.save();
        const token=jwt.sign({user:user1._id}, process.env.secret, {"expiresIn":"1h"});
        const {password:pass2, ...restofThings}=user1._doc;
        res.cookie("token",token,{httpOnly:true}).status(200).json(restofThings);
    }
    else{
        const token=jwt.sign({user:user._id}, process.env.secret, {"expiresIn":"1h"});
        const {password:pass2, ...restofThings}=user._doc;
        res.cookie("token",token,{httpOnly:true}).status(200).json(restofThings);

    }
}   catch(err){
    next(err);
}
    
}