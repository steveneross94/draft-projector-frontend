import React from 'react';
import { Link } from 'react-router-dom'
import EditForm from '../Forms/EditForm'
import PlayersContainer from '../Players/PlayersContainer'
import { teamUrl, userUrl} from '../URLs/urls'

const initialState = {
    isEditUser: false,
    username: '',
    confirmation: '',
    name: '',
    favTeam: 'nfl+football',
    currentPassword: '', 
    newPassword: '',
    validationPassword: '',
    id: '',
    team: []
}

class User extends React.Component {

  state = initialState
  // this.props.match.params.id NOTE THAT THIS ID IS A STRING
  

  componentDidMount(){
    this.fetchUser(this.props.userInfo.userId)
    fetch(teamUrl)
      .then(r => r.json())
      .then(team => {
        let myTeam = team.filter(t => t.user_id === this.props.userInfo.userId)
        this.setState({
          team: myTeam
        })
      })
  }

  fetchUser = (id) => {
    // const { id } = this.props.match.params
    fetch(`${userUrl}/${id}`)
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

 
  toggleEditButton = () => {
    this.setState(prevState => ({ isEditUser: !prevState.isEditUser}))
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  handleSubmit = e => {
    e.preventDefault()
      const { id } = this.props.match.params
      const { name, favTeam, newPassword, confirmation, username, validationPassword, currentPassword } = this.state;
      let patchPassword = newPassword 
      if (newPassword === '') {
        patchPassword = validationPassword
      }
      if (validationPassword === currentPassword && newPassword === confirmation) {
        fetch(`${userUrl}/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            username,
            password: patchPassword,
            name,
            fav_team: favTeam
          })
        })
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
          this.props.loginUserInfo(userData.id, userData.username, userData.name, userData.fav_team)
        })
       } else {
        alert('Must enter your current password and any new passwords must match. If you do not enter a new password, you will keep your current password.')
    }
  }



  renderUserPage = () => {
      const { username, name, favTeam, team} = this.state;
      let myTeamUrl = '/teams'
      return (
          <>
            <h2>Name: {name}</h2>
            <h2>Username: {username}</h2>
            <h2>Favorite Team: {favTeam ? favTeam.split('+').join(' ') : 'loading...'}</h2>
            {this.state.team.length ? team.map(team => <Link to={myTeamUrl+`/${team.id}`} onClick={() => this.props.currentTeam(team.id)}>{team.name}</Link>) : null}
            <Link to='/teams'>Create Team</Link>
          </>
      )
  }



  deleteUser = () => {
    const { id } = this.props.match.params
    fetch(userUrl+`/${id}`, {
      method: 'DELETE'
    })
    .then(this.props.removeUserFromState())
    .then(this.props.history.push(`/`))
  }
  
  linkToTeams = () => {
    const { id } = this.props.match.params
    this.props.history.push(`/users/${id}/teams`) 
  }

  render(){
    let { isEditUser, username, currentPassword, newPassword, name, confirmation, favTeam } = this.state;
    // console.log('IN AUTH', this.props.history) // routerProps are POWERFUL!!!
    console.log(this.state);
      return (
        <>
        <div className='container'>
          {this.props.userInfo.userId
           ?<> 
            <div className="column one">
                <h1>{isEditUser ? 'Edit Your Account' : 'Account Information'}</h1>
                { isEditUser ? <EditForm  username={username} currentPassword={currentPassword} newPassword={newPassword} name={name} confirmation={confirmation} favTeam={favTeam} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/> : this.renderUserPage() }
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
            <div className="column two"> 
                  <div>
                    <PlayersContainer />
                  </div>
            </div>
          </>
          :<div className='login alert'> 
            <h2>You must login to see your User Page </h2> 
            <br/><br/>
            <Link to='/login'>Click here to login or sign up!</Link>
          </div>      
          }     
        </div>
        <div className='login-footer'></div>
        </>
      )
  }
}

export default User;














