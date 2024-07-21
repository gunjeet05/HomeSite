import React, { useState } from 'react'
//Main color #b37300


function Login() {

  const [formData, setFormData]=useState({});
  const [loading , setLoading]=useState(false);
  const [error, setError]=useState("");

  function onInputChange(e){
    setError("");
    setFormData({
      ...formData, 
      [e.target.name]:e.target.value,


    })


    //console.log(e);
    console.log(formData);


    
  }
  function validate(){
    if(!formData.password || !formData.email){
      return false;
    }
    return true;

  }
  async function handleSubmit(e){
    
    e.preventDefault();
    try{
      setError("");
      if(!validate()){
        //console.log("Missing data handled")
        setError("Somefield is missing");
        return;
      }
      
      setLoading(true);

      
    const res=await fetch("api/signin", {
      method:"POST",
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(formData), 

    })
    const data=await res.json();
    console.log(data);

    if(data.Completed==='False'){
      console.log("error handled");
      console.log("dataMessage--",data.message);
      setError(data.message || "Some error occured");
      setLoading(false);
      return ;
    }
    setLoading(false);

  }
  catch(err){
    console.log(err);
    setError(err || "Some error occured");

    setLoading(false);
    
  }
}

  return (
    <div className='bg-white h-full mt-10'>
     <form className='flex flex-col gap-2 items-center justify-center h-full '>
        <h1 className='text-xl font-bold'>
        Sign In
        </h1>
        
        <input name='email' type="text"  className='w-6/12 mt-2 p-2 border-2 border-slate-600 rounded-lg' placeholder='Enter you email' onChange={onInputChange}/>
        <input name='password' type ="text"  className='w-6/12 mt-2 p-2 border-2 border-slate-600 rounded-lg' placeholder='Enter Your Password' onChange={onInputChange}/>
        {error && <p className='text-red-600'>
      {error}
      </p>}
        <button disabled={loading}  className={`w-6/12 mt-2 p-2 rounded-lg bg-mainColor text-lg text-white hover:bg-lightColor ${loading?'bg-lightColor':'bg-mainColor'}`} onClick={handleSubmit}>{loading?'Loading...':'SignIn'}</button>
        <div className='flex flex-row gap-2'>
          <p>Don't have account? </p>
          <a href="/signup">
            <span className='text-blue-600'> SignUp</span>
          </a>
        </div>
        
     </form>
     
    </div>
  )
}

export default Login;
