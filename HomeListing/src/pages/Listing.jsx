import React, { useState } from 'react'
import {storage} from "../firebase.js"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


const Listing = () => {

  const[error, setError]=useState("");
  const [file, setFile]=useState([]);
  const [formData, setFormData]=useState({
    "image":[]
  })
  const [errorWhileUploading, setErrorWhileUploading]=useState(false);
  const[uploading, setUploading]=useState(false);

  console.log("file", file);
  console.log("formData", formData);
  console.log(formData.image[0]);
const handleFileChange=(e)=>{
  console.log("Object Files", e.target.files);
  setFile(Array.from(e.target.files));
  console.log(file);

}

const handleSubmit=(e)=>{
  setUploading(true);
    e.preventDefault();
    try{
    console.log("function called");
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
    "image":formData.image.filter((val, ind)=>ind!==index),
  })
  
  console.log(formData.image.length)

}


  return (
    <div className='flex flex-col justify-center items-center p-4 font-semibold h-100%'>
      <h2 className='text-3xl'>Create a listing</h2>
      <form className='grid grid-cols-2 w-9/12 p-6 '>
        <div className='flex flex-col gap-y-3 w-9/12 text-'>
            <input type="text" className='border-2 border-slate-600 rounded-lg p-2' maxLength={20} placeholder='name' />
            <textarea type="text" minLength={10} maxLength={100} required className='border-2 border-slate-600 p-2 rounded-lg' placeholder='description' />
            

            <div className='flex flex-wrap text-lg gap-x-3 font-normal'>
            
            <div>
            <input type="checkbox" id='sale' className='' />
            <span>Sale</span>
            </div>
            <div >
            <input type="checkbox" id='rent' />
            <span>Rent</span>
            </div>
            <div >
            <input type="checkbox" id='rent' />
            <span>Parking Spot</span>
            </div>
            <div >
            <input type="checkbox" id='furished' />
            <span>Furnised</span>
            </div>
            <div >
            <input type="checkbox" id='sale' />
            <span>discount</span>
            </div>
            </div>


            <div className='flex flex-col text-lg gap-y-3 font-normal py-4 '>

            <div className='flex justify-between'>
            <span>Bed</span>
            <input type="number"  className='border-2 border-slate-600 w-9/12 rounded-lg px-2'/>
            </div>


            <div className='flex justify-between'>
            <span>Bath</span>
            <input type="number"  className='border-2 border-slate-600 w-9/12 rounded-lg px-2'/>
            
            </div>
            <div className='flex justify-between'>
            <span>Price</span>
            <input type="number"  className='border-2 border-slate-600  w-9/12 rounded-lg px-2' />
           
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
           <button type="button" className='border-2 border-green-400 p-3 rounded-lg' onClick={handleSubmit}>{uploading? "Uploading...":"Upload"}</button>
           </div>

           <button  className='mt-6 w-full self-center text-white bg-mainColor p-2 rounded-lg text-lg '>Create Listing</button>
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

export default Listing
