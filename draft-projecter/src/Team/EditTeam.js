import React from 'react'
import { rostersUrl } from '../URLs/urls'

const initialState = {
    user_price: "",
    status: ""
}

class EditTeam extends React.Component {
    state = initialState

    componentDidUpdate(prevProps){
        if (prevProps !== this.props){
            if (this.props.editPlayer) {
                this.setState({
                    user_price: this.props.editPlayer.user_price,
                    status: this.props.editPlayer.status
                })
            }
        }
    }

    handleInput = e => {
        this.setState({[e.target.name]: e.target.value})
    }
    
    handleEditSubmit = e => {
        e.preventDefault()
        fetch(`${rostersUrl}/${this.props.editPlayer.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_price: parseInt(this.state.user_price),
                status: this.state.status
            })
        })
        .then(res=>res.json())
        .then(player=> {
            this.props.handleNewPrice(player)
            // this.setState(initialState)
        })

    }
    
    render(){
        console.log(this.state);
        return (
            <div>
                {this.props.editPlayer && 
                    <div>
                        <form onSubmit={this.handleEditSubmit}>
                            <label>{this.props.editPlayer.player_name}:</label>
                            <input type='text' name="user_price" value={this.state.user_price} onChange={this.handleInput}/>
                            <button type="submit" value="Submit">Change Price</button>
                            <select name="status" value={this.state.status} onChange={this.handleInput}>
                                <option value="edit">Keep Editing</option>
                                <option value="queue">Back to Queue</option>
                                <option value="undrafted">Back to Player Pool</option>
                                <option value="anotherteam">Add to Another Team</option>
                                <option value="myteam">Add to My Team</option>
                            </select>
                        </form>
                    </div>}
            </div>
        )
    }
}


export default EditTeam
