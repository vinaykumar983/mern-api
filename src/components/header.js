import {Route,Routes} from 'react-router-dom'
import Home from './home';
import Register from './register';
import Login from './login';
import Contactus from './contactus';
import Dashboard from './dashboard';
import Donate from './donate';
import Receive from './receive';
import {Navbar,Nav,Container} from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate,NavLink} from 'react-router-dom'
import {clearLoginStatus} from '../slices/userSlice';

import './header.css'

function Header() {
  let {userObj,isError,isLoading,isSuccess,errMsg}=useSelector(
    (state)=>state.user
  )
  let dispatch=useDispatch();
  let navigate=useNavigate()
  const userLogout=()=>{
    localStorage.clear();
    dispatch(clearLoginStatus());
    navigate("/login");
  }


    return (
      <div className='z'>
        {/*<h1>Header</h1>*/}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {isSuccess!==true?(
          <Nav className="ms-auto">
            <NavLink className="nav-link" to="">Home</NavLink>
            <NavLink className="nav-link" to="register">Reister</NavLink>
            <NavLink className="nav-link" to="login">Login</NavLink>
            <NavLink className="nav-link" to="contactus">Contact us</NavLink>
            
            {/*<Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Log in</Nav.Link>
            <Nav.Link href="/contactus">Contact Us</Nav.Link>
          <Nav.Link href="/aboutus">About Us</Nav.Link>*/}
          </Nav>)
             :(
              <Nav className="ms-auto">
               {/* <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/contactus">Contact Us</Nav.Link>
             <Nav.Link href="/aboutus">About Us</Nav.Link>*/}
             <NavLink className="nav-link" to="">Home</NavLink>
              <NavLink className="nav-link" to="contactus">Contact us</NavLink>
              
                <Nav.Link onClick={userLogout}>Logout</Nav.Link>
            </Nav>
             )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            
            <Route path="/contactus" element={<Contactus/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/dashboard/donate" element={<Donate/>}/>
            <Route path="/dashboard/receive" element={<Receive/>}/>
        </Routes>
      </div>
    );
  }
  
  export default Header;
  