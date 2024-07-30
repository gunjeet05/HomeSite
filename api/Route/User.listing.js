import express from "express";
import verifyToken from "../utils/VerifyToken.js";
import Listing from "../Model/Listing.js";

const router=express.Router();

router.post("/createListing",verifyToken,  async (req, res, next)=>{
    try{
        const toSend=await Listing.create(req.body);
        res.json(toSend);
    }
    catch(err){
        next(err);
    }
})

export default router;