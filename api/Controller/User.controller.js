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
    res.cookie("token",token,{httpOnly:true}).status(200).json(restofThings);
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



export const updateUser=async (req, res, next)=>{
   try{
    const userid=req.user.user|| req.user.user_id;
    console.log("userid", userid);
    if(userid!==req.params.id){
        return next(new Error(`You can change your profile only ${req.user.user_id} ${req.params.id}`));

    }

    
    console.log("Backend reqbody", req.body);
    if(req.body.password){
        req.body.password=bcrypt.hashSync(req.body.password, 10);
    }
    const newuser=await User.findByIdAndUpdate(req.params.id, 
        {$set:{
            username:req.body.username, 
            password:req.body.password, 
            email:req.body.email, 
            picture:req.body.picture, 
        }
    }, 
    {new:true}
    )
    
    const {password , ...rest}=newuser._doc;
    res.status(200).json(rest);

    
    
}
    catch(err){
        next(err);
    }


   

}