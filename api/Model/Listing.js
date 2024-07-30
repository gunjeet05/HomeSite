import mongoose, { Schema } from "mongoose";

const listingSchema=new Schema({
    name:{
        type:String, 
        required:true, 

    }, 
    description:{
        type:String, 
        required:true, 
    }, 
    address:{
        type:String, 
        required:true, 
    }, 
    regularPrice:{
        type:Number, 
        required:true,
    }, 
    discountedPrice:{
        type:Number,
        required:true,
    },
    bathroom:{
        type:Number, 
        required:true
    }, 
    bedroom:{
        type:Number, 
        requied:true, 
    }, 
    furnished:{
        type:Boolean, 
        requied:true,
    }, 
    parking:{
        type:Boolean, 
        requied:true,
    },
    type:{
        type:String,
        requied:true, 

    },
    offer:{
        type:Boolean, 
        required:true, 
    },
    image:{
        type:Array, 
        requied:true, 
    }, 
    userRef:{
        type:String, 
        required:true, 
    }



})

const Listing=mongoose.model("Listing", listingSchema);
export default Listing;