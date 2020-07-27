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
      num_bench: team.num_bench
    })
  })
}

// getAllPlayers = () => {
//   let booleanMatch = false
//   fetch(rostersUrl)
//   .then(res=>res.json())
//   .then(playersData => {
//     playersData.forEach(player => {
//       if (this.props.match.params.id === player.team_id) {
//         booleanMatch = true
//         this.setState({playersPool: [...this.state.playersPool, player]})
//       }
//     })
//   })
//   if (!booleanMatch) {
//     fetch(playersUrl)
//     .then(r => r.json())
//     .then(data => {
//       data.forEach(player => {
//         fetch(rostersUrl, {
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             team_id: parseInt(this.props.match.params.id),
//             player_id: player.id,
//             user_price: player.default_price,
//             status: "undrafted",
//             player_name: player.name,
//             player_position: player.position,
//             player_team: player.team
//           })
//         })
//         .then(res => res.json())
//         .then(player => this.setState({playersPool: [...this.state.playersPool, player]}))
//       })
//     })
//   }
// }


handleClick = (e) => {
  console.log(e.target);
}

render() {
  
  return (
  <div className="container">
      <div className="column">User: {this.props.userInfo.username}
        <div>Current Fantasy Team: {this.state.name}</div>
        <div>Key: Player Name, Position, Team, Default Price</div>
        <div className="player box">{this.props.players ? this.props.players.map(player => 
                <div key={player.id}>
                    <div name={player.name} position={player.position} team={player.team} price={player.default_price} onClick={this.handleClick}><strong>{player.name}</strong>, {player.position}, {player.team}, {player.default_price}</div>
                </div>
                    ) : 'loading...' }</div>
      </div>
      <div><RenderTeam  {...this.state} /> </div>
    </div>
  )
}
}

export default TeamPage;
