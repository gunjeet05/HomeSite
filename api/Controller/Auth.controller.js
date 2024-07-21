import User from '../Model/User.js'

import bcrypt from 'bcrypt';


 const signup=async (req, res, next)=>{
    const {username, email, password} =req.body;
   
    const user=new User({
        username:username,
        email:email,
        password: bcrypt.hashSync(password, 10),
        

    })
    try{
    await user.save();
    res.status(401);
    res.json("Data entered successfully");
    }
    catch(err){
       next(err);
    }


}
export default signup;