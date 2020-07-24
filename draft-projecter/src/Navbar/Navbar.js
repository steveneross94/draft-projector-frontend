import React from 'react'
import { Link } from 'react-router-dom'
 

 
 const Navbar = props => {

     return (
       <div className="navbar">
          <Link to='/'>🏈&nbsp;Home</Link>
          <Link to='/login'>Login</Link>
          <Link to='/users/:id'>User Page</Link>
          <Link to='/users/:id/teams'>Teams</Link>
       </div>
     )
   
 }
 
 export default Navbar;
