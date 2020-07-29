import React from 'react';
import { userUrl } from '../URLs/urls'
import TeamSelectBox from '../Forms/TeamSelectBox'

const initialState = {
  isNewUser: false,
  username: '',
  password: '',
  confirmation: '',
  name: '',
  favTeam: 'nfl+football'
}

class Auth extends React.Component {
  state = initialState
  

  toggleNewUser = () => this.setState(prevState => ({ isNewUser: !prevState.isNewUser, username: '', password: '', name: '', confirmation: '' }))

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
      const { isNewUser, name, favTeam, password, confirmation, username } = this.state;
      if (isNewUser) {
        if (password !== confirmation){
          alert('Your passwords did not match!')
        } else {
          fetch(userUrl)
          .then(res => res.json())
          .then(data => {
            let match = false
            data.forEach(user => {
              if (user.username === username) {
                match = true
              }
            })
            if (match) {
              alert('This entered username is already taken. Try again')
            }  else {
              fetch(userUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
                },
                body: JSON.stringify({
                  username,
                  password,
                  name,
                  fav_team: favTeam
                })
              })
              .then(res => res.json())
              .then(userData => { 
                // console.log(userData)
                this.props.loginUserInfo(userData.id, userData.username, userData.name, userData.fav_team)
                this.setState(initialState) 
                this.props.history.push(`/users/${userData.id}`) 
              })
            }
          })
        } 
      } else {
        fetch(userUrl)
        .then(res => res.json())
        .then(userData => {
          let thisUser = userData.find(user => user.username === username)
          console.log(thisUser, userData );
            if (thisUser)  {
              if(thisUser.password === password) {
                this.props.loginUserInfo(thisUser.id, thisUser.username, thisUser.name, thisUser.fav_team)
                this.setState(initialState) 
                this.props.history.push(`/users/${thisUser.id}`)
              } else {
                alert("Incorrect password for this username")
              }
            } else {
              alert("This username doesn't exist in our database.")
            }
        })
      }
  }

  

  renderLogin = () => {
      const { username, password } = this.state;
      return (
          <>
            <form onSubmit={this.handleSubmit}>
              <label>Username:&nbsp;
                <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/><br/>
              </label>
              <label>&nbsp;Password:&nbsp;
                <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/><br />
              </label>
              <button type="submit" value="Submit">Submit</button>
            </form>
          </>
      )
  }

  renderSignup = () => {
      const { username, password, name, confirmation, favTeam } = this.state;
      return (
          <> 
            <form onSubmit={this.handleSubmit}>
              <label>Your Name:&nbsp;
              <input name="name" placeholder="Name or Nickname" value={name} onChange={this.handleChange}/>
              </label><br/>
              <label>&nbsp;Username:&nbsp;
              <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
              </label><br/>
              <label>&nbsp;&nbsp;Password:&nbsp;
              <input name="password" placeholder="Password" type="password" value={password} onChange={this.handleChange}/>
              </label><br/>
              <label>&nbsp;&nbsp;Password:&nbsp;
              <input name="confirmation" placeholder="Confirm Password"  type="password" value={confirmation} onChange={this.handleChange}/>
              </label><br/>
              <TeamSelectBox favTeam={favTeam} handleChange={this.handleChange}/>
              <button type="submit" value="Submit">Submit</button>
          </form>
          </>
      )
  }
  
  render(){
      let { isNewUser } = this.state;
      // console.log('IN AUTH', this.props.history) // routerProps are POWERFUL!!!
      return (
        <>
          <div className="simple-flex-col">
              <h3>{isNewUser ? 'Create an Account' : 'Login'}</h3>
              { isNewUser ? this.renderSignup() : this.renderLogin() }
              <br/>
              <br/>
              {isNewUser
                ? <h2>Already Have an Account?</h2>
                : <h2>New to Budget Your Draft?</h2>}
              <button onClick={this.toggleNewUser}>{isNewUser ? "Login" : "Create an Account"}</button>
          </div>
          <div className='login-footer'></div>
          </>
      )
  }
}

export default Auth;
















// class Login extends React.Component {
//  render() {
//    return (
//      <form>
//        <h1>Login</h1>
//        <div>
//          <input type="text" name="username" placeholder="Username" />
//          <label htmlFor="username">Username</label>
//        </div>
//        <div>
//          <input type="password" name="password" placeholder="Password" />
//          <label htmlFor="password">Password</label>
//        </div>
//        <input type="submit" value="Login" />
//      </form>
//    );
//  }
// }

// export default Login;
