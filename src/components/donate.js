import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useState } from 'react';
import {useSelector} from 'react-redux'
import Donatedel from './donateDel'
import Footer from './footer'

function Donate() {

    let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
        (state)=>state.user
      )

    const {register,handleSubmit,formState:{errors}}=useForm();
    
   {/* const onFormSubmit1=(obj)=>{
        axios.delete("http://localhost:4000/food-api/del-food/"+obj.dphone)
       // console.log(data.name)
        .then((response)=>{
            if(response.data.message==undefined)
              alert("Please enter valid details")
            else
              alert(response.data.message)
        })
        .catch((error)=>{
            alert("error occured",error.message)
        })
    }*/}

    const onFormSubmit=(foodData)=>{
        
         
     //   console.log(foodData)
         foodData.user="donor"
         //foodData.username=userObj.username
        axios.post("http://localhost:4000/food-api/add-food",foodData)
        .then((response)=>{
          if(response.data.message=="Thank you for donating the food..."){
                alert("Thank you for donating the food... request is sent... The receivers will contact you")
          }
        })
        .catch((error)=>{
          alert("error occured",error.message)
        })
    }
    return (
        <div>
        <div className="container mt-5">
        <div className="card w-75 mx-auto a1">
        <div className="card-body">
        <h1 className="text-center b1 text-light">Donate</h1>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
            <label for="name" className="form-label text-light">Name</label>
            <input type="text" id="name" className="form-control" {...register("name",{required:true})}></input>
            {errors.name?.type=='required'&&<p className='text-danger'>*name is required</p>}
            </div>
            <div>
            <label for="mail" className="form-label text-light" placeholder="Enter username">Email</label>
            <input type="email" id="mail" className="form-control" {...register("email",{required:true})}></input>
            {errors.email?.type=='required'&&<p className='text-danger'>*Email is required</p>}
            </div>
            <div>
            <label for="phone" className="form-label text-light" placeholder="Enter username">Contact no.</label>
            <input type="number" id="phone" className="form-control" {...register("phone",{required:true})}></input>
            {errors.phone?.type=='required'&&<p className='text-danger'>*phone no. is required</p>}
            </div>
            <div>
            <label for="place" className="form-label text-light" placeholder="Enter username">Enter your area</label>
            <input type="text" id="place" className="form-control" {...register("place",{required:true})}></input>
            {errors.place?.type=='required'&&<p className='text-danger'>*Location is required</p>}
            </div>
            <div>
            <label for="food" className="form-label text-light" placeholder="Enter username">What is the food present with you?</label>
            <textarea className="form-control" rows="5" {...register("food",{required:true})}></textarea>
            {errors.food?.type=='required'&&<p className='text-danger'>*Food present is required</p>}
            </div>
            <div>
            <label for="time" className="form-label text-light" placeholder="Enter username">At what time food is prepared?</label>
            <input type="time" id="time" className="form-control" {...register("time",{required:true})}></input>
            {errors.time?.type=='required'&&<p className='text-danger'>*time is is required</p>}
            </div>

            <div className='text-center mt-3'>
            <button type="submit" className='btn btn-primary text-light'>Submit</button>
            </div>
        </form>
        </div>
        
        </div>
        
      </div>
     {/* <div className='container mt-5'>
      <div className="card w-75 mx-auto a1">
        <div className="card-body">
      <div>
            <h4 className='b1 text-light'>Please delete your request if food is spoiled or when food is donated to the receiver</h4>
            <form onSubmit={handleSubmit(onFormSubmit1)}>
            <div>
            <label for="dname" className="form-label text-light">Enter your name:</label>
            <input type="text" id="dname" className="form-control" {...register("dname")}></input>
            </div>
            <div>
            <label for="phone" className="form-label text-light" placeholder="Enter username">Contact no.</label>
            <input type="number" id="phone" className="form-control" {...register("dphone")}></input>
            </div>
            <div className='text-center mt-3'>
            <button className='btn btn-danger text-light' type='submit'>Delete request</button>
            </div>
            </form>
        </div>
        </div>
        </div>
    </div>*/}
    <Donatedel/>
    <Footer/>
      </div>
    );
  }
  
  export default Donate;
  