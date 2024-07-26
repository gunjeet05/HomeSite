
import jwt from "jsonwebtoken"
import ErrorFile from "./ErrorFile.js";

const verifyToken=(req, res, next)=>{
    
    const token=req.cookies.token;
    if(!token){
        return next(ErrorFile(400, "Unauthorized"));

    }
    jwt.verify(token, process.env.secret, (err, user)=>{
        if(err){
            console.log(err);
            return next(err);
        }
        req.user=user;
        //console.log("Backend verify" , req.user);
        next();
    });
    
}
export default verifyToken;