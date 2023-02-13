import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useState } from 'react';
import './receive.css'
import './login.css'
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import Footer from './footer';

function Receive() {
    const {register,handleSubmit,formState:{errors}}=useForm();
    let [d,setD]=useState(undefined);
    let [i,setI]=useState(1);
    const onFormSubmit=(foodReceive)=>{
     //   console.log(foodData)
        foodReceive.user="receiver"
        let token=localStorage.getItem("token");
        axios.get("http://localhost:4000/food-api/find-food/"+foodReceive.place,{
            headers:{Authorization:"Bearer "+token}
          })
        .then((response)=>{
            if(response.data.payload.length==0)
                alert("No donors found")
            else{
            alert(response.data.message)
            setD(response.data.payload)
            }
        })
        .catch((error)=>{
          alert("error occured",error.message)
        })
    }
    return (
        <div>
        <div className="container mt-5 xz">
        <div className="card w-75 mx-auto a1">
        <div className="card-body">
        <h1 className="text-center b1 text-light">Receive</h1>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
            <label for="name" className="form-label text-light" placeholder="Enter username">NGO name</label>
            <input type="text" id="name" className="form-control" {...register("name",{required:true})}></input>
            </div>
            <div>
            <label for="mail" className="form-label text-light" placeholder="Enter username">Email</label>
            <input type="email" id="mail" className="form-control" {...register("email",{required:true})}></input>
            </div>
            <div>
            <label for="place" className="form-label text-light" placeholder="Enter username">Enter your area</label>
            <input type="text" id="place" className="form-control" {...register("place",{required:true})}></input>
            </div>
            <div className='text-center mt-3'>
            <button type="submit" className='btn btn-primary text-light'>Submit</button>
            </div>
        </form>
        </div>
        </div>
        <div>
        <h3 className='k4 text-center mt-3'>Donors around you</h3>
     {d!=undefined?d.map(data=>(<div class="card text-dark k2 mt-3 w-75 mx-auto" key={data.username}>
  <div className="card-header text-center text-light h3">Donor</div>
  
  <div className="card-body">
    <h3 className='text-light'>Name               : {data.name}</h3>
    <h3 className='text-light'>Area               : {data.place}</h3>
    <h3 className='text-light'>Email              : {data.email}</h3>
    <h3 className='text-light'>contact no.        : {data.phone}</h3>
    <h3 className='text-light'>Food available     : {data.food}</h3>
    <h3 className='text-light'>Food prepared time : {data.time}</h3>
  </div>
</div>)):<h2 className='text-center mt-3 k4'>Fill the form to find the Donors around you</h2>}
</div>
      </div>
      {/*<div className='foot'>
      <div className='adc'>
            <div className='icon'>
                <IoLogoInstagram size={45}></IoLogoInstagram>
            </div>
            <div className='icon'>
                <IoLogoFacebook size={45} ></IoLogoFacebook>
            </div>
            <div className='icon'>
                <IoLogoTwitter size={45}></IoLogoTwitter>
            </div>
            </div>
            <h3>ⓒCopyrights.All rights reserved</h3>
    </div>*/}
    <Footer/>
     </div>
    );
  }
  
  export default Receive;
  