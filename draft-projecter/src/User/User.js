import React from 'react';
import { Link } from 'react-router-dom'


const userUrl = 'http::localhost:3000/api/v1/'

class Auth extends React.Component {
  state = {
      isEditUser: false,
      username: '',
      confirmation: '',
      name: '',
      favTeam: '',
      currentPassword: '', 
      newPassword: '',
      validationPassword: '',
      id: ''
  }

  // this.props.match.params.id NOTE THAT THIS ID IS A STRING
  

  // componentDidMount(){
  //   this.fetchUser()
  // }

  fetchUser = () => {
    const { id } = this.props.match.params
    fetch(`${userUrl}/${id}`)
    .then(res => res.json())
    .then(userData => {
      this.setState({
        username: userData.username,
        validationPassword: userData.password,
        name: userData.name,
        favTeam: userData.fav_team,
        id: userData.id
      })
    })
  }

 
  toggleEditButton = () => {
    this.setState(prevState => ({ isEditUser: !prevState.isEditUser}))
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
      const { id } = this.props.match.params
      const { isEditUser, name, favTeam, newPassword, confirmation, username } = this.state;
      if (isEditUser) {
        fetch(`${userUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            username,
            password: newPassword,
            name,
            fav_team: favTeam
          })
        })
        .then(res => res.json())
        .then(userData => userData)
      } else {
        fetch(userUrl)
        .then(res => res.json())
        .then(userData => {
          this.setState({
            isEditUser: false,
            username: userData.username,
            name: userData.name,
            favTeam: userData.fav_team,
            validationPassword: userData.password, 
            newPassword: '',
            confirmation: '',
            currentPassword: '',
            id: userData.id
          })
        })
      }
  }

  renderUserPage = () => {
      const { username, name, favTeam } = this.state;
      return (
          <>
            <h2>Name: {name}</h2>
            <h2>Username: {username}</h2>
            <h2>Favorite Team: {favTeam}</h2>
          </>
      )
  }

  renderEditForm = () => {
      const { username, currentPassword, newPassword, name, confirmation, favTeam } = this.state;
      return (
          <> 
            <form onSubmit={this.handleSubmit}>
              <label>Your Name:&nbsp;
              <input name="name" placeholder="Name or Nickname" value={name} onChange={this.handleChange}/>
              </label><br/>
              <label>&nbsp;Username:&nbsp;
              <input name="username" placeholder="Username" value={username} onChange={this.handleChange}/>
              </label><br/>
              <label>Current Password:&nbsp;
              <input name="currentPassword" placeholder="Password" type="password" value={currentPassword} onChange={this.handleChange}/>
              </label><br/>
              <label>New Password:&nbsp;
              <input name="newPassword" placeholder="New Password"  type="password" value={newPassword} onChange={this.handleChange}/>
              </label><br/>
              <label>Confirm New Password:&nbsp;
              <input name="confirmation" placeholder="Confirm new Password"  type="password" value={confirmation} onChange={this.handleChange}/>
              </label><br/>
              <label>Your Team:&nbsp;
              <input name="favTeam" placeholder="Your Favorite Team"  type="text" value={favTeam} onChange={this.handleChange}/>
              </label><br/>
              <button type="submit" value="Submit">Submit</button>
          </form>
          </>
      )
  }

  deleteUser = () => {
    const { id } = this.props.match.params
  }

  linkToTeams = () => {
    const { id } = this.props.match.params
    this.props.history.push(`/users/${id}/teams`) 
  }

  render(){
      let { isEditUser } = this.state;
      // console.log('IN AUTH', this.props.history) // routerProps are POWERFUL!!!
      return (
          <div className="simple-flex-col">
              <h1>{isEditUser ? 'Edit Your Account' : 'Account Information'}</h1>
              { isEditUser ? this.renderEditForm() : this.renderUserPage() }
              <br/>
              <br/>
              { !isEditUser && <button onClick={this.linkToTeams}>Go To Your Draft Budgets</button>}
              <br/>
              <br/>
              {isEditUser
                ? <h2>Go Back to Your Page</h2>
                : <h2>Edit or Cancel Your Account</h2>}
              <button onClick={this.toggleEditButton}>{isEditUser ? "Stop Edit" : "Edit"}</button>
              <br/>
              <br/>
              { isEditUser && 
              <>
                <h2>Cancel Your Account</h2>
                <button onClick={this.deleteUser}>Delete this Account</button>
              </>}
          </div>
      )
  }
}

export default Auth;














