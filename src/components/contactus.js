import {Form} from 'react-bootstrap'
import { Button } from 'bootstrap';
import Footer from './footer';
import './contactus.css'
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function Contactus() {

  const {register,handleSubmit,formState:{errors}}=useForm();
  let navigate=useNavigate()
  const onFormSubmit=(query)=>{
     
      axios.post("http://localhost:4000/user-api/query",query)
      .then((response)=>{
        if(response.data.message=="success"){
            alert("We will look int to your issue...Thank you")
        }
        console.log(response.data.message)
      })
      .catch((error)=>{
        alert("error occured",error.message)
      })
  }

    return (
     <div>

<div className='a2'>
  <div>
      <div className="container mt-5 a100">
        
        <div className="card w-75 mx-auto a1">
        <div className="card-body">
        <h1 className="text-center text-light b1">Contactus</h1>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
            <label for="na" className="form-label text-light" placeholder="Enter name">Name</label>
            <input type="text" id="na" className="form-control" {...register("name",{required:true})}></input>
            {errors.name?.type=='required'&&<p className='text-danger'>*name is required</p>}
            </div>
            <div>
            <label for="mail" className="form-label text-light" placeholder="Enter email">Email</label>
            <input type="email" id="mail" className="form-control" {...register("email",{required:true})}></input>
            {errors.email?.type=='required'&&<p className='text-danger'>*email is required</p>}
            </div>
            
          
            <div>
            <label for="add" className="form-label text-light" placeholder="write query">Write your issue here</label>
            <textarea className="form-control" rows="5" {...register("query",{required:true})}></textarea>
            {errors.query?.type=='required'&&<p className='text-danger'>*this field is required</p>}
            </div>
            <div className='text-center mt-3'>
              <button type="submit" className='btn text-center text-light bg-primary'>Submit</button>
            </div>
        </form>
        </div>
        </div>
      </div>
      </div>
      </div>
     

     
      <Footer/>
     </div>
    );
  }
  
  export default Contactus;
  