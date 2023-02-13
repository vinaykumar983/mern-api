import { Button, Nav } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
import './dashboard.css'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {clearLoginStatus} from '../slices/userSlice';
import Footer from './footer'

function Dashboard() {

  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
    (state)=>state.user
  )
  

    return (
      <div>
      <div className="container mt-5 mx-auto v2 rounded">
        <h1 className="text-center v1 text-light" >Donate or Receive food</h1>
        <div className="parent text-center">
        
        <div className="card m-3 c1">
          <img src="https://www.wikihow.com/images/thumb/e/e6/Donate-Food-Step-03.jpg/v4-460px-Donate-Food-Step-03.jpg" className="card-img-top"/>
          <div className="card-body">
        <p className="card-text">Leave a helping hand to the hungry,Let's get the hunger to the prison, If one can, why can't you?</p>
        </div>
          
          <Nav className="justify-content-center mt-3" >
         <Nav.Item>
           <Nav.Link to="donate" as={NavLink}>
             <p className="c3 text-light rounded">Donate food</p>
           </Nav.Link>
         </Nav.Item>
       </Nav>
       <div className="mt-3">
         <Outlet />
       </div>
        </div>
        <div className="card m-3 c1">
          <img src="https://www.wikihow.com/images/thumb/b/ba/Donate-Food-Step-01.jpg/v4-460px-Donate-Food-Step-01.jpg" className="card-img-top"/>
          <div className="card-body">
        <p className="card-text">Share food, share the love , If you are hungry then click on the below button,You're in good hands with us.</p>
        </div>
          
          {isSuccess==true?(
          <Nav className="justify-content-center mt-3" >
         <Nav.Item>
           <Nav.Link to="receive" as={NavLink}>
             <p className="c3 text-light rounded">Receive food</p>
           </Nav.Link>
         </Nav.Item>
       </Nav>):(<button className="btn btn-primary" >Receive food</button>)
      }
       <div className="mt-3">
         <Outlet />
       </div>
        </div>
        </div>
        
      </div>
      <Footer/>
      </div>
    );
  }
  
  export default Dashboard;
  