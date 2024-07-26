import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from "react-redux"
import {storage} from '../firebase.js'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {updateError, updateStart, updateSuccess} from '../redux/user/userSlice.js'
//
import { useDispatch } from 'react-redux';

function Profile() {
  //console.log("hello");
 
  const imageref=useRef(null);
  const [file, setFile]=useState(null);
  const[percent, setPercent]=useState(0);
  const [fileError, setFileError]=useState(false);
  const [downloadurl,setUrl]=useState("");
  
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  const [formData, setFormData]=useState({});
  
  const dispath=useDispatch();
  const handleChange=(e)=>{
   // console.log("e.target",e.target.files[0].name);
    if(e.target.files[0])
    setFile(e.target.files[0]);
    // setFormData({
    //   ...formData, 
    //   picture:e.target.files[0], 
    // })

  }
  console.log(percent);
  console.log("Downloadable URL", downloadurl);
  useEffect(()=>{
    if(file){
    saveFile(file);
    }
  },[file]);

  function saveFile(file){
   // console.log("fileName", new Date().toString()+file.name);
    const storageRef=ref(storage, new Date().toString()+file.name);
    const uploadFile=uploadBytesResumable(storageRef,file);
    uploadFile.on(
      "state_changed", 
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        const approx=Math.round(progress);
        //console.log("percent", approx);
        setPercent(approx);

        
      },
      (err)=>{
        console.log("Error in uploading", err);
        setFileError(true);
        
      }, 
      ()=>{
        getDownloadURL(uploadFile.snapshot.ref).then((url)=>{
          setUrl(url);
          setFormData({
            ...formData, 
            picture:url,
          })
        })
      }
    )
    
  }
  
  async function handleClick(e){
    dispath(updateStart());
    e.preventDefault();
    try{


    console.log("Current user in profile", currentUser);
    const data=await fetch(`/api/updateUser/${currentUser._id}`, {
      method:"POST", 
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    
    const res=await data.json();
    if(res.Completed==='False'){
      console.log("Error in updating", res);
      dispath(updateError(res.message));
      return ;
    }
    dispath(updateSuccess(res))
    //console.log("After  res");
    console.log("Result for updating the user", res);
  }
  catch(err){
    console.log("Error in updating file");
    dispath(updateError(err));
    
  }
  }

  const handleFieldChange=(e)=>{

      setFormData({
        ...formData, 
        [e.target.name]:e.target.value
      })
      console.log(formData);
  }
  

  console.log("CurrentUSer in profile", currentUser);
  return (
    <div className='flex flex-col  justify-center items-center gap-2 mt-6'>
      <h1 className='text-2xl font-semibold mt-2'>
        Profile
      </h1>
      <img className="w-1/12 rounded-full object-cover cursor-pointer mt-3" onClick={()=>imageref.current.click()} src={currentUser.picture} alt="" />
      <form className='flex flex-col gap-2 mt-2 w-6/12'>
      {fileError && <p>Something Wrong With File</p>}
      {(percent>0 && percent<100)? <p>{percent}</p>:<p></p>}
      <input type="file" className='hidden' ref={imageref} onChange={handleChange}/>
        <input name="username" className='border-2 rounded-lg p-2 border-slate-600 mt-1' type="text" placeholder='username' onChange={handleFieldChange} defaultValue={currentUser.username} />
        <input name="email" className='border-2 rounded-lg p-2 border-slate-600 mt-1' type="text" placeholder='email' onChange={handleFieldChange} defaultValue={currentUser.email}/>
        <input name="password" className='border-2 rounded-lg p-2 border-slate-600 mt-1' type="password" placeholder='Password'onChange={handleFieldChange} />
        <button onClick={handleClick} className='bg-green-800 text-white p-2 rounded-lg mt-1 hover:bg-green-700'> Update changes</button>
      </form>
      <div className='flex justify-around w-9/12 md:w-10/12' >
        <span className='text-red-600 '>Delete Account</span>
        <span>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
//Some doubt in picture url 
//