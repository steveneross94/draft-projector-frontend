import React from 'react'
import { NavLink } from 'react-router-dom'
 
 
const link = {
   width: '100px',
   padding: '12px',
   margin: '0 6px 6px',
   background: 'blue',
   textDecoration: 'none',
   color: 'white',
 }
 
 class Navbar extends React.Component {
   render() {
     return (
       <div>
       <NavLink
           to="/"
           exact
           style={link}
           activeStyle={{
             background: 'darkblue'
           }}
         >Home</NavLink>
         <NavLink
           to="/login"
           exact
           style={link}
           activeStyle={{
             background: 'darkblue'
           }}
         >Login</NavLink>
         <NavLink
           to="/signup"
           exact
           style={link}
           activeStyle={{
             background: 'darkblue'
           }}
         >Sign Up</NavLink>
          <NavLink
           to="/users/:id"
           exact
           style={link}
           activeStyle={{
             background: 'darkblue'
           }}
         >User Page</NavLink>
         <NavLink
             to='/users/:id/teams'
             exact
             style={link}
             activeStyle={{
                 background: 'darkblue'
             }}
         >Teams</NavLink>
       </div>
     )
   }
 }
 
 export default Navbar;
