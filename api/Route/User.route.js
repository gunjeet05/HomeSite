//name to test .

import express from "express";
import { user, signin } from "../Controller/User.controller.js";
import User from "../Model/User.js";

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


export default Router;


