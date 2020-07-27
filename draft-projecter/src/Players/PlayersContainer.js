import React, { Component } from 'react'
import { Container } from 'react-bootstrap'

class PlayersContainer extends Component {

    state = {
        players: []
    }

    componentDidMount(){
        this.getAllPlayers()
    }

    getAllPlayers = () => {
        fetch('http://localhost:3001/api/v1/players')
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
        <Container >
            <div className='players'>
                <h2>All Players In Database</h2>
                {players.map(player => 
                <div key={player.id}>
                    <div>{player.name}</div>
                        <ol>
                            <li>{player.position}</li>
                            <li>{player.team}</li>
                            <li>Default Price: ${player.default_price}</li>
                        </ol>
                </div> 
                )}
            </div>
        </Container>
        )
    }
}

export default PlayersContainer
