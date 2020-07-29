import React from 'react';
import RenderTeam from './RenderTeam'
import { playersUrl, teamUrl, rostersUrl } from '../URLs/urls'
import EditTeam from './EditTeam'
import MyTeam from './MyTeam'
import SearchByName from './SearchByName'
import SearchByPrice from './SearchByPrice'


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
  playersPool: [],
  selectedPlayer: [],
  status: "undrafted",
  searchName: '',
  searchPrice: 0,
  searchPriceStatus: 'byMinPrice'
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


//editPrice playerQueue
 changeRemainingBudget = (id, price, source) => {
  if (price > this.state.budget) {
    alert("You do not have the Auction Money to draft this player. Player will be sent to draft pool.")
    if (source === "editPrice") {
      this.backToPlayerPool(id)
      this.fetchPlayerToUndraftedStatus(id)
    }
  } else {
    let newBudget = parseInt(this.state.budget) - parseInt(price)
    this.setState(prevState => {
      return {budget: parseInt(prevState.budget) - parseInt(price)}
    })
    this.addToMyTeam(id)
    this.fetchNewTeamBudget(newBudget)
  } 
 }

 fetchNewTeamBudget = (teamBudget) => {
   console.log(teamBudget)
   
   fetch(teamUrl+`/${parseInt(this.props.match.params.id)}`, {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json'
    }, 
    body: JSON.stringify({
      budget: teamBudget
    })
  })
  .then(res=>res.json())
  .then(team=>console.log(team))
  
 }

 fetchPlayerToUndraftedStatus = (id) => {
   fetch(rostersUrl+`/${id}`, {
     method: "PATCH",
     headers: {
       "Content-Type": 'application/json'
     }, 
     body: JSON.stringify({
       status: "undrafted"
     })
   })
   .then(res => res.json())
   .then(player => console.log(player))
 }

getRosterPlayers = () => {
  let booleanMatch = true
  fetch(rostersUrl)
  .then(res=>res.json())
  .then(rosterData => {
    // let thisTeam = rosterData.filter(player => player.id =)
      rosterData.forEach(player => {
       
        if (parseInt(this.props.match.params.id) === parseInt(player.team_id)) {
          booleanMatch = false
          console.log(booleanMatch)
          this.setState({playersPool: [...this.state.playersPool, player]})
        }
      })
      if (booleanMatch) {
        console.log("Inside Post", booleanMatch)
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
  })
}

handleTeamAssignment= (player) => {
  fetch(`${rostersUrl}/${player.id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        status: player.status
    })
  })
  .then(res=>res.json())
  .then(player=>console.log(player))
}

addToMyTeam = id => {
  let newPlayersPool = this.state.playersPool.map(player => {
    if (player.id === id) {
      player.status = "myteam"
      this.handleTeamAssignment(player)
      return player
    }
      return player
  })
  this.setState({playersPool: newPlayersPool})
}

addToOpponent = id => {
  let newPlayersPool = this.state.playersPool.map(player => {
    if (player.id === id) {
      player.status = "anotherteam"
      this.handleTeamAssignment(player)
      return player
    }
      return player
  })
  this.setState({playersPool: newPlayersPool})
}

backToPlayerPool = id => {
  let newPlayersPool = this.state.playersPool.map(player => {
    if (player.id === id) {
      player.status = "undrafted"
      return player
    }
      return player
  })
  this.setState({playersPool: newPlayersPool})
}


handleClick = (id) => {
  let playerId = parseInt(id)
  let selectedPlayer = this.state.playersPool.find(p => p.id === playerId)
  selectedPlayer.status = "queue"
  console.log(selectedPlayer);
  this.sendPlayerToQueue(selectedPlayer)
}



sendToEdit = (id) => {
  let playerId = parseInt(id)
  let selectedPlayer = this.state.playersPool.find(p => p.id === playerId)
  selectedPlayer.status = "edit"
  console.log(selectedPlayer);
  let newPlayersPool = this.state.playersPool.map(player => {
    if (player.id === playerId) {
      return selectedPlayer
    }
      if (player.status === "edit") {
        player.status = "undrafted"
      }
      return player
  })
  this.setState({playersPool: newPlayersPool})
}

sendPlayerToQueue = (thisPlayer) => {
  let newPlayersPool = this.state.playersPool.map(player => {
    if (player.id === thisPlayer.id) {
      return thisPlayer
    }
      if (player.status === "queue") {
        player.status = "undrafted"
      }
      return player
  })
  this.setState({playersPool: newPlayersPool})
}


updatePlayerInList = (thisPlayer) => {
  let newPlayersPool = this.state.playersPool.map(player => {
    if (player.id === thisPlayer.id) {
      return thisPlayer
    }
      return player
  })
  this.setState({playersPool: newPlayersPool})
}



handleNewPrice = (player) => {

  let newPlayersPool = this.state.playersPool.map(p => {
    if (player.id === p.id) {
      p.user_price = player.user_price
      return p
    }
      return p
  })
  this.setState({playersPool: newPlayersPool})

  if (player.status === "queue"){
    this.sendPlayerToQueue(player)

  } else if (player.status === "myteam") {
    this.changeRemainingBudget(player.id, player.user_price, "editPrice")
  }
  else {
    this.updatePlayerInList(player)
  } 
}

handleChange = (e) => {
  this.setState({
    [e.target.name]: e.target.value
  })
}

removeFromMyTeam = (player) => {
  let newBudget = parseInt(this.state.budget) + parseInt(player.user_price)
  player.status = "undrafted"
  let newPlayersPool = this.state.playersPool.map(p => {
    if (player.id === p.id) {
      return player
    }
      return p
  })
  this.setState({
    playersPool: newPlayersPool,
    budget: newBudget
  })
  this.handleTeamAssignment(player) 
  this.fetchNewTeamBudget(newBudget)
}



filterAndSearchPlayers = () => {
  const { status, searchName, searchPrice, searchPriceStatus } = this.state
  let filteredPlayers = [...this.state.playersPool].filter(player => player.status === this.state.status)
  let thisSearchPrice = searchPrice
  if (searchPrice === '') {
    thisSearchPrice = 0
  }
  if (searchPriceStatus === 'byMinPrice') {
    return filteredPlayers.filter(player => player.player_name.toLowerCase().includes(searchName.toLowerCase()) && parseInt(player.user_price) >= parseInt(thisSearchPrice))
  } else if (searchPriceStatus === "byMaxPrice") {
    return filteredPlayers.filter(player => player.player_name.toLowerCase().includes(searchName.toLowerCase()) && parseInt(player.user_price) <= parseInt(thisSearchPrice))
  } 
}


render() { 
  const {searchPrice, searchName, searchPriceStatus } = this.state
  let selectedPlayers = this.state.playersPool.filter(player => player.status === "queue")
  let currentPlayerPool = this.filterAndSearchPlayers()
  let myPlayers = this.state.playersPool.filter(player => player.status === "myteam")
  let editedPlayers = this.state.playersPool.find(player => player.status === "edit")
  console.log(selectedPlayers, editedPlayers);
  return (
    <>
  <div className="container">
      <div className="column">User: {this.props.userInfo.username}
        <div>Current Fantasy Team: {this.state.name}</div>
        <div>Key: Player Name, Position, Team, Default Price</div>
        <div>Selected Player: {selectedPlayers
                              && selectedPlayers.map(player =>
                              <div>
                              {player.player_name},{player.player_position},{player.player_team},{player.user_price}
                              <br></br>
                              <button onClick={() => this.changeRemainingBudget(player.id, player.user_price, "playerQueue")}>My Player</button><button onClick={()=>this.addToOpponent(player.id)}>Opponent Player</button><button onClick={() => this.sendToEdit(player.id)}>Edit Price</button><button onClick={() => this.backToPlayerPool(player.id)}>Remove From Queue</button>
                                </div>
                              )}</div>
            <SearchByName searchName={searchName} handleChange={this.handleChange}/>
            <SearchByPrice searchPrice={searchPrice} searchPriceStatus={searchPriceStatus} handleChange={this.handleChange}/>
            <label>Filter Players</label>
            <select className='select player' name="status" value={this.state.status} onChange={this.handleChange}>
                                <option value="undrafted">Undrafted</option>
                                <option value="anotherteam">Other Teams</option>
                            </select>
                            <br></br>
        <div className="player box">{currentPlayerPool ? currentPlayerPool.sort((p1,p2) => p1.user_price > p2.user_price ? -1 : 1).map(player => 
                <div key={player.id} id={player.id} onClick={() => this.handleClick(player.id)}>
                    <div 
                        name={player.player_name} 
                        position={player.player_position} 
                        team={player.player_team} 
                        price={player.user_price} 
                      >
                        <strong>{player.player_name}</strong>, 
                        {player.player_position}, 
                        {player.player_team}, 
                        {player.user_price}
                      </div>
                </div>
                    ) : 'loading...' }</div>
      </div>
      <div>
        <RenderTeam  {...this.state} myPlayers={myPlayers}/> 
        <EditTeam editPlayer={editedPlayers} handleNewPrice={this.handleNewPrice}/>
        <MyTeam myTeam={myPlayers} removeFromMyTeam={this.removeFromMyTeam}/>
      </div>
    </div>
     <div className='login-footer'></div>
     </>
  )
}
}

export default TeamPage;
