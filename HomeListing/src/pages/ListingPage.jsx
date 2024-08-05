import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import {Swipercore} from 'swiper'
import 'swiper/swiper-bundle.min.css';

const ListingPage = () => {
    
    const [formData, setFormdata]=useState({});
    const [error,setError]=useState("");
    const {id}=useParams();
    

    const fetchData=async()=>{ const res= await fetch(`/api/getData/${id}`, {
        method:"GET", 
        headers:{
            "Content-type":"application/json"
        }
    })

    const data=await res.json();

    if(data.Completed===false){
        setError(data.message);
    }
    else{
        setFormdata(data);
        console.log("User in listing page", data);
    }

}
    useEffect(()=>{
        fetchData();
    },[])

  return (
    <div>
      hello world
    </div>
  )
}

export default ListingPage
