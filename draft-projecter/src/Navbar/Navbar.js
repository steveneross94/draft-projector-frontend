import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavLink from 'react-router-dom/NavLink'
  

 
 const NavBar = props => {

     return (
       <Navbar className='navbar'>
          <Link to='/'>Home</Link>
          <Link to='/users/:id'>User Page</Link>
          {props.userInfo.userId 
          ? <Link to='/login' onClick={props.logoutUser}>Logout</Link>
          : <Link to='/login'>Login</Link>}
          <Link to='/teams'>Create Team</Link>
       </Navbar>
     )
   
 }
 
 export default NavBar;

 