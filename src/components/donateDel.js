import {useForm} from 'react-hook-form'
import axios from 'axios';
import { useState } from 'react';
import {useSelector} from 'react-redux'

 
function Donatedel() {

    const {register,handleSubmit,formState:{errors}}=useForm();
    const onFormSubmit1=(obj)=>{
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
    }

  return (
    <div>
        
        <div className='container mt-5'>
      <div className="card w-75 mx-auto a1">
        <div className="card-body">
      <div>
            <h4 className='b1 text-light'>Please delete your request if food is spoiled or when food is donated to the receiver</h4>
            <form onSubmit={handleSubmit(onFormSubmit1)}>
            <div>
            <label for="dname" className="form-label text-light">Enter your name:</label>
            <input type="text" id="dname" className="form-control" {...register("dname",{required:true})}></input>
            {errors.dname?.type=='required'&&<p className='text-danger'>*name is required</p>}
            </div>
            <div>
            <label for="phone" className="form-label text-light" placeholder="Enter username">Contact no.</label>
            <input type="number" id="phone" className="form-control" {...register("dphone",{required:true,minLength:10,maxLength:10})}></input>
            {errors.dphone?.type=='required'&&<p className='text-danger'>*phone no. is required</p>}
            {errors.dphone?.type=='minLength'&&<p className='text-danger'>*mobile no. should have 10 digits</p>}
            {errors.dphone?.type=='maxLength'&&<p className='text-danger'>*mobile no. should have 10 digits</p>}
            </div>
            <div className='text-center mt-3'>
            <button className='btn btn-danger text-light' type='submit'>Delete request</button>
            </div>
            </form>
        </div>
        </div>
        </div>
  </div>
    </div>
  );
}

export default Donatedel;
