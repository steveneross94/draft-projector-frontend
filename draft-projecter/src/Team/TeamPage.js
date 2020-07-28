import React from 'react';
import RenderTeam from './RenderTeam'
import PlayerPool from './PlayerPool'
import { playersUrl, teamUrl, rostersUrl } from '../URLs/urls'


const initialState={
  name: '',
  budget: 200,
  num_qb: 1,
  num_rb: 1, 
  num_wr: 2, 
  num_te: 1,
  num_flex: 1,
  num_k: 0, 
  num_def: 0, 
  num_superflex: 1, 
  num_bench: 5,
  playersPool: []
}




class TeamPage extends React.Component {

 state = initialState
 
 componentDidMount(){
  fetch(teamUrl+`/${parseInt(this.props.match.params.id)}`)
  .then(r => r.json())
  .then(team => {
    this.setState({
      name: team.name,
      budget: team.budget,
      num_qb: team.num_qb,
      num_rb: team.num_rb, 
      num_wr: team.num_wr, 
      num_te: team.num_te,
      num_flex: team.num_flex,
      num_k: team.num_k, 
      num_def: team.num_def, 
      num_superflex: team.num_superflex, 
      num_bench: team.num_bench,
      playersPool: []
    })
  })
  this.getRosterPlayers()
}

 

getRosterPlayers = () => {
  let booleanMatch = false
  fetch(rostersUrl)
  .then(res=>res.json())
  .then(rosterData => {
    // let thisTeam = rosterData.filter(player => player.id =)
      rosterData.forEach(player => {
       
        if (parseInt(this.props.match.params.id) === parseInt(player.team_id)) {
          console.log('hit')
          booleanMatch = true
          this.setState({playersPool: [...this.state.playersPool, player]})
        }
      })

  })
  if (!booleanMatch) {
    console.log('another fetch')
    this.props.players.forEach(player => {
        fetch(rostersUrl, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            team_id: parseInt(this.props.match.params.id),
            player_id: parseInt(player.id),
            user_price: parseInt(player.default_price),
            status: "undrafted",
            player_name: player.name,
            player_position: player.position,
            player_team: player.team
          })
        })
        .then(res => res.json())
        .then(player => this.setState({playersPool: [...this.state.playersPool, player]}))
    })
  }
}


handleClick = (e) => {
  console.log(e.target);
}

render() {
  
  
  return (
  <div className="container">
      <div className="column">User: {this.props.userInfo.username}
        <div>Current Fantasy Team: {this.state.name}</div>
        <div>Key: Player Name, Position, Team, Default Price</div>
        <div className="player box">{this.state.playersPool ? this.state.playersPool.map(player => 
                <div key={player.id}>
                    <div name={player.player_name} position={player.player_position} team={player.player_team} price={player.user_price} onClick={this.handleClick}><strong>{player.player_name}</strong>, {player.player_position}, {player.player_team}, {player.user_price}</div>
                </div>
                    ) : 'loading...' }</div>
      </div>
      <div><RenderTeam  {...this.state} /> </div>
    </div>
  )
}
}

export default TeamPage;
