import React from 'react'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import  auth from "../firebase.js"
import {signinStart, signinFail,signinSuccess} from "../redux/user/userSlice.js";
import { useDispatch } from 'react-redux';
const OAuth =() => {
  const dispatch=useDispatch();
  async function handleClick(){
    try{
    dispatch(signinStart());
    const provider=new GoogleAuthProvider();
    const res=await signInWithPopup(auth, provider);
    console.log("Data from firebase", res.user);
    const dataToSend={
      username:res.user.displayName,
      email:res.user.email, 
      photo:res.user.photoURL,
    }
    console.log("data to send to backend", dataToSend);
    const res1=await fetch("/api/googlelogin", {
      method:"POST", 
      headers:{
        'Content-type':"application/json",
      },
      body:JSON.stringify(dataToSend),
    })
    console.log("OAuth",res1);
    const data=await res1.json();
    dispatch(signinSuccess(data));
  }catch(err){
    dispatch(signinFail("Error in oAuth"));
    console.log("Error in oauth", err);
  }
}

  return (
    <button type="button" onClick={handleClick} className='bg-green-500 w-6/12 mt-2 p-2 rounded-lg text-lg text-white hover:bg-green-800'>
      Continue with google
    </button>
  )
}

export default OAuth;
