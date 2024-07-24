//name to test .

import express from "express";
import { user, signin, googleLogin } from "../Controller/User.controller.js";
import User from "../Model/User.js";
import jwt from "jsonwebtoken";
const Router=express.Router();

Router.get("/test", user);
Router.post("/signin",signin);
// Router.post("/addUser", (req, res)=>{
    
//     const user=req.body.user;
//     addUser(user);
//     res.json({
//         "message":"Ho gya bhai"
//     })
// })

Router.post("/googlelogin",googleLogin )


export default Router;


