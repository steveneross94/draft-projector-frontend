import React from 'react';


class SignUp extends React.Component {
 render() {
   return (
     <form>
       <h1>Create New User</h1>
       <div>
         <input type="text" name="username" placeholder="Username" />
         <label htmlFor="username">Username</label>
       </div>
       <div>
         <input type="password" name="password" placeholder="Password" />
         <label htmlFor="password">Password</label>
       </div>
       <input type="submit" value="Login" />
     </form>
   );
 }
}

export default SignUp;
