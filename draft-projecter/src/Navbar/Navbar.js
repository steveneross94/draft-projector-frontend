import React from 'react'
import { Link } from 'react-router-dom'
  

 
 const Navbar = props => {

     return (
       <div className="navbar">
          <Link to='/'>Home</Link>
          <Link to='/users/:id'>User Page</Link>
          {props.userInfo.userId 
          ? <Link to='/login' onClick={props.logoutUser}>Logout</Link>
          : <Link to='/login'>Login</Link>}
          <Link to='/teams'>Create Team</Link>
       </div>
     )
   
 }
 
 export default Navbar;
