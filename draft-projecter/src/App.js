import React from 'react';
import logo from './logo.svg';

import { Route, Switch } from 'react-router-dom'
import './App.css';

import PlayersContainer from './containers/PlayersContainer'
import Navbar from './Navbar/Navbar'
import User from './User/User'
import TeamPage from './Team/TeamPage'
import Home from './Home/Home'
import Auth from './Auth/Auth'
import CreateTeam from './Team/CreateTeam'

const initialState = {
  teamId: null,
  userInfo: {
  userId: null,
  username: '',
  name: '',
  favTeam: ''
   }
}
 class App extends React.Component{ 
   state=initialState
  
  //  (userData.id, userData.username, userData.name, userData.favTeam)
   loginUserInfo = (userId, username, name, favTeam) => {
     this.setState({
      userInfo: {
        userId: userId,
        username: username,
        name: name,
        favTeam: favTeam
      }
     })
   }

   logoutUser = () => {
     this.setState(initialState)
   }

   currentTeam = (id) => {
     this.setState({teamId: id})
   }

  render(){  
   console.log(this.state)
   const { userInfo, teamId } = this.state
    return(
      <div>
        <Navbar class="container" userInfo={userInfo} logoutUser={this.logoutUser}/>
        <Switch>
          <Route exact path='/users/:id' render={(routerprops) => <User {...routerprops} userInfo={userInfo} teamId={teamId} loginUserInfo={this.loginUserInfo} currentTeam={this.currentTeam}/>} /> 
          <Route exact path='/teams/:id' render={(routerprops) => <TeamPage {...routerprops} userInfo={userInfo}/>} teamId={teamId}/>
          <Route exact path='/teams/new' render={(routerprops) => <CreateTeam {...routerprops} userInfo={userInfo} currentTeam={this.currentTeam}/>} /> 
          <Route exact path='/login' render={(routerprops) => <Auth {...routerprops} loginUserInfo={this.loginUserInfo}/>}/>
          <Route exact path='/' render={(routerprops) => <Home {...routerprops} userInfo={userInfo}/>}/>
        </Switch>
      </div>
    )
  }
}
  


export default App;
