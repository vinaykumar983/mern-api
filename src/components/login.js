import {useForm} from 'react-hook-form'
import { userLogin } from '../slices/userSlice'
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoTwitter } from "react-icons/io5";
import { IoLogoFacebook } from "react-icons/io5";
import Footer from './footer';
import './login.css';
function Login() {
    const {register,handleSubmit,formState:{errors}}=useForm()
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
      (state)=>state.user
    )
    const onFormSubmit=(userCredentialsObject)=>{
      console.log(userCredentialsObject)
      dispatch(userLogin(userCredentialsObject))
    }

    useEffect(()=>{
      if(isSuccess){
      navigate("/dashboard")
      }
      if(isError){
        console.log(errMsg)
        alert(errMsg)

      }
    },[isSuccess,isError,errMsg]);

    return (
      <div>
        <div>
        <div className="container mt-5 zx">
        
        <div className="card w-50 mx-auto a1">
        <div className="card-body">
        <h1 className="text-center text-light b1">Login</h1>
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div>
            <label for="name" className="form-label text-light" placeholder="Enter username">User name</label>
            <input type="text" id="name" className="form-control" {...register("username",{required:true})}></input>
            {errors.username?.type=='required'&&<p className='text-danger'>*username is required</p>}
            </div>
            <div>
            <label for="pass" className="form-label text-light" placeholder="Enter password">Password</label>
            <input type="password" id="pass" className="form-control" {...register("password",{required:true})}></input>
            {errors.password?.type=='required'&&<p className='text-danger'>*password is required</p>}
            </div>
            <div className='text-center mt-3'>
            <button type="submit" className='btn btn-primary text-light'>login</button>
            </div>
        </form>
        </div>
        </div>
      </div>
      </div>
      <div>
      <Footer/>
      </div>
      </div>
    );
  }
  
  export default Login;
  