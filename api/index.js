import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';


dotenv.config();

const mongodb=process.env.MONGO;

mongoose.connect(process.env.MONGO).then(()=>{

    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

const app=express();

app.listen(3000, ()=>{
    console.log("Server is running on Port 3000!!!");
})

