import React, { Component } from 'react'
import { playersUrl } from '../URLs/urls'

class PlayersContainer extends Component {

    state = {
        players: []
    }

    componentDidMount(){
        this.getAllPlayers()
    }

    getAllPlayers = () => {
        fetch(playersUrl)
        .then(r => r.json())
        .then(data => {
            this.setState({
                players: data
            })
        })
    }

    render() {
        const { players } = this.state
        return (
            <div>
                <div>All Available Players</div>
                {players.map(player => 
                <div key={player.id}>
                    <div>{player.name}</div>
                    <ul>
                        <li>{player.position}</li>
                        <li key={player.id}>{player.team}</li>
                        <li>{player.default_price}</li>
                    </ul>
                </div>
                    )}
            </div>
        )
    }
}

export default PlayersContainer
