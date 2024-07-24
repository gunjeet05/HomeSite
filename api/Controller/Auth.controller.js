import User from '../Model/User.js'

import bcrypt from 'bcrypt';


 const signup=async (req, res, next)=>{
    const {username, email, password} =req.body;
   
    const user=new User({
        username:username,
        email:email,
        password: bcrypt.hashSync(password, 10),
        picture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        

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