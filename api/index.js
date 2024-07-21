import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';

import Router from './Route/User.route.js';
import authRoute from "./Route/User.auth.js";
import errorHandler from './MiddleWare/ErrorHandler.js';
dotenv.config();

const mongodb=process.env.MONGO;


mongoose.connect(mongodb).then(()=>{

    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})

const app=express();
app.use(express.json());




app.use( "/api", Router)
app.use("/api", authRoute);

app.use(Router);
app.use(errorHandler);



app.listen(3000, ()=>{
    console.log("Server is running on Port 3000!!!");
})


