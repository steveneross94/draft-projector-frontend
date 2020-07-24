import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './Login/Login'
import Navbar from './Navbar/Navbar'
import User from './User/User'
import Team from './Team/Team'
import Home from './Home/Home'
import SignUp from './SignUp/SignUp'

ReactDOM.render(
  <Router>
    <div>
      <Navbar />
      <Route exact path='/' component={Home} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <Route exact path='/users/:id' component={User} />
      <Route exact path='/users/:id/teams' component={Team} />
    </div>
  </Router>,
  document.getElementById('root')
);

{/* <React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root') */}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
