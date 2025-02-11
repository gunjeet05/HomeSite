
import mongoose from "mongoose";

const user = new mongoose.Schema({
    username:{
        type:String, 
        required:true, 
        unique:true,
    }, 
    email:{
        type:String, 
        required:true,
        unique:true,
    },
    password:{
        type:String, 
        required:true, 
    },
    picture:{
        type:String,
        
    }

},{
    timestamps:true,
})


const User=mongoose.model("User", user);

export default User;
