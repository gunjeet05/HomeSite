import React, { useEffect, useState } from 'react'
import {storage} from "../firebase.js"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';



const UpdateListing = () => {
   

  const[error, setError]=useState("");
  const [file, setFile]=useState([]);
  const {currentUser}=useSelector((state)=>state.user);
  const [formData, setFormData]=useState({
    "name":"", 
    "description":"", 
    "address":"", 
    "regularPrice":0, 
    "discountedPrice":0, 
    "bathroom":0, 
    "bedroom":0, 
    "furnished":false,
    "parking":false,
    "type":"sell",
    "offer":false,
    "image":[], 
    "userRef":currentUser._id, 
  })

  const {id}=useParams();

  console.log(currentUser._id);
  const [errorWhileUploading, setErrorWhileUploading]=useState(false);
  const[uploading, setUploading]=useState(false);

  // useEffect(()=>{
  //   console.log("formData",formData);
  // },[formData])

  // console.log("file", file);
  // console.log("formData", formData);
  // console.log(formData.image[0]);
const handleFileChange=(e)=>{
 // console.log("Object Files", e.target.files);
  setFile(Array.from(e.target.files));
  console.log(file);

}

const handleSubmit=(e)=>{
  setUploading(true);
    e.preventDefault();
    try{
    //console.log("function called");
    if(file.length>=1 && file.length<7){
        const promises=[];
        
        // e.target.files.forEach(element => {
          
        // });
        file.forEach((val, ind)=>{
          promises.push(uploadFile(val));
        })

        console.log("Promises", promises);
        Promise.all(promises)
        .then((urls)=>{
          setFormData({
            ...formData, 
            "image":formData.image.concat(urls),
          })

        })
        .catch((err)=>{
          
          setErrorWhileUploading(true);
        })
        .finally(()=>{
          setUploading(false);
        })

        

        
        

        

    }
    else{
        setUploading(false);
        setError("Choose between 1 to 6 files");
    }

  }
  catch(err){
    setUploading(false);
    setError(err);
  }

    
    


}

const uploadFile=(file)=>{
  return new Promise((resolve, reject)=>{
    const storageRef=ref(storage, new Date().toString()+file.name);
    const upload=uploadBytesResumable(storageRef, file);
    upload.on(
     "state_changed", 
     (snapshot)=>{
 
     }, 
 
     (err)=>{
        reject(err);
     }, 
     ()=>{
      getDownloadURL(upload.snapshot.ref).then((url)=>{
        resolve(url);
      })
     }


    )
  })
   

    
}

const deleteImage=(index)=>{
  console.log("Delete image called");
  setFormData({
    ...formData, 
    "image":formData.image.filter((val, ind)=>ind!==index),
  })
  
  console.log(formData.image.length);
  

}

const handleChange=(e)=>{
  
  if(e.target.id==="name" || e.target.id==="description" || e.target.id==="bed" || e.target.id==="bath" ||e.target.id==="price" || e.target.id==="address"){
    setFormData({
      ...formData, 
      [e.target.id]:e.target.value,

    })
    
  }

  if(e.target.id==="sale" || e.target.id==="rent"){
    setFormData({
      ...formData, 
      "type":e.target.id,
    })


  }

  if(e.target.id)

  if(e.target.id==="parking"||e.target.id==="furnished"|| e.target.id==="offer"){
    console.log("parking")
    setFormData({
      ...formData, 
      [e.target.id]:(formData[e.target.id]===false)? true:false,
    })
  }

  



}

const sendData=async (e)=>{
  console.log("Data to send", JSON.stringify(formData));

  try{
    e.preventDefault();
    const res=await fetch("/api/createListing", {
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify(formData),
    })
    const data=await res.json();
    //console.log("Data recieved from backend", data);
    if(data.completeted==="False"){
      console.log(data.message);
      setError(data.message);

    }
    else{
      console.log("Data added");
    }

  }catch(err){
    console.log("Error in sending data", err);
    setError(err);
  }

}

const getData=async()=>{
    const res=await fetch(`/api/getData/${id}`, {
        method:"GET", 
        headers:{
            "Content-Type":"application/json",
        }
       


    }
    

)

const data=await res.json();
if(data.completeted==="false"){
    setError(data.message);
    return ;

}
else{
    setFormData(data);
    
}

}
useEffect(()=>{
    getData();
    
},[])

const updateData=async(e)=>{
    e.preventDefault()
    const res=await fetch(`/api/updateListing/${id}`, {
        method:"POST", 
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const data=await res.json();
    console.log("Data recieved while updating the listing", data);
}


  return (
    <div className='flex flex-col justify-center items-center p-4 font-semibold h-100%'>
      <h2 className='text-3xl'>Update a listing</h2>
      <form className='grid grid-cols-2 w-9/12 p-6 '>
        <div className='flex flex-col gap-y-3 w-9/12 text-'>
            <input type="text" className='border-2 border-slate-600 rounded-lg p-2' maxLength={20} placeholder='name' onChange={handleChange} id='name' defaultValue={formData.name}/>
            <textarea type="text" minLength={10} maxLength={100} required className='border-2 border-slate-600 p-2 rounded-lg' placeholder='description' id='description' onChange={handleChange} defaultValue={formData.description}/>
            <input type="text" className='border-2 border-slate-600 rounded-lg p-2' maxLength={20} placeholder='address' onChange={handleChange} id='address' defaultValue={formData.address}/>

            <div className='flex flex-wrap text-lg gap-x-3 font-normal'>
            
            <div>
            <input type="checkbox" id='sale' className='' onChange={handleChange} checked={formData.type==="sale"} />
            <span>Sale</span>
            </div>
            <div >
            <input type="checkbox" id='rent' onChange={handleChange} checked={formData.type==="rent"}/>
            <span>Rent</span>
            </div>
            <div >
            <input type="checkbox" id='parking' onChange={handleChange} checked={formData.parking} />
            <span>Parking Spot</span>
            </div>
            <div >
            <input type="checkbox" id='furnished' onChange={handleChange} checked={formData.furnished}  />
            <span>Furnised</span>
            </div>
            <div >
            <input type="checkbox" id='offer' onChange={handleChange}  checked={formData.offer} />
            <span>discount</span>
            </div>
            </div>


            <div className='flex flex-col text-lg gap-y-3 font-normal py-4 '>

            <div className='flex justify-between'>
            <span>Bed</span>
            <input type="number"  className='border-2 border-slate-600 w-9/12 rounded-lg px-2' id='bed' onChange={handleChange} defaultValue={formData.bedroom}/>
            </div>


            <div className='flex justify-between'>
            <span>Bath</span>
            <input type="number"  className='border-2 border-slate-600 w-9/12 rounded-lg px-2' id='bath' onChange={handleChange} defaultValue={formData.bathroom}/>
            
            </div>
            <div className='flex justify-between'>
            <span>Price</span>
            <input type="number"  className='border-2 border-slate-600  w-9/12 rounded-lg px-2' id='price' onChange={handleChange} defaultValue={formData.regularPrice}/>
           
            </div>
            </div>
            

        </div>
        <div className='text-base'>
           
           <div className='text-sm font-medium'>
            <p>
                Choose Images Maximum 6
            </p>
           </div>
            <div className='flex items-center justify-between'>
           <input className='w-8/12 border-2 border-slate-200 p-2' type="file" accept='image/*' onChange={handleFileChange} multiple/>
           <button type="button" className='border-2 border-green-400 p-3 rounded-md' onClick={handleSubmit}>{uploading? "Uploading...":"Upload"}</button>
           </div>

           <button  className='mt-6 w-full self-center text-white bg-mainColor p-2 rounded-lg text-lg ' onClick={updateData}>Update Listing</button>
           <div className='flex flex-col gap-2'>
           {formData.image.length>0 && formData.image.map((val,ind)=>{
           
            return <div className='flex justify-between pt-2' key={ind}>
              <img key={ind} src={val} alt="img" className='h-20 w-20' />
              <button type="button" onClick={()=>deleteImage(ind)}>Delete</button>
              </div>
           })}
           </div>
           {error && <p>{error}</p>}
        </div>
       

      </form>
    </div>
  )
}

export default UpdateListing;
