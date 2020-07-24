import React from 'react';
import logo from './logo.svg';

import { Route, Switch } from 'react-router-dom'
import './App.css';

import PlayersContainer from './containers/PlayersContainer'
import Navbar from './Navbar/Navbar'
import User from './User/User'
import Team from './Team/Team'
import Home from './Home/Home'
import Auth from './Auth/Auth'


 class App extends React.Component{ 
  
  render(){  
    return(
      <div>
        <Navbar class="container"/>
        <Switch>
          <Route exact path='/users/:id/teams/:id' component={Team} />
          <Route exact path='/users/:id' component={User} /> 
          <Route exact path='/login' component={Auth} />
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    )
  }
}
  


export default App;
