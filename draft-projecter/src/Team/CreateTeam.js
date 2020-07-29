import React from 'react'
import { teamUrl } from '../URLs/urls'
import { Link } from 'react-router-dom'

class CreateTeam extends React.Component {
    state = {
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
    }

    
    

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
      }

    handleSubmit = (e) => {
        e.preventDefault()
        const {  name, budget, num_qb, num_rb, num_wr, num_te, num_flex, num_k, num_def, num_superflex, num_bench } = this.state
        fetch(teamUrl, {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                name,
                user_id: this.props.userInfo.userId,
                budget,
                num_qb,
                num_rb, 
                num_wr, 
                num_te,
                num_flex,
                num_k, 
                num_def,
                num_superflex, 
                num_bench,   
            })
        })
        .then(r => r.json())
        .then(team => {
            this.props.currentTeam(team.id)
            this.props.history.push(`/teams/${team.id}`)
        })
    }

    render() {
        console.log(this.state);
        return (
            <>
            <div>
                {this.props.userInfo.userId ? 
                <form className='team form' onSubmit={(e) => this.handleSubmit(e)}>
                    <label>Team Name:</label>
                    <input type="text" name='name' value={this.state.name} placeholder="Team Name" onChange={this.handleChange}/>

                    <label>Budget:</label>
                    <input type="number" name='budget' value={this.state.budget} placeholder="200" onChange={this.handleChange}/>

                    <label>Num of QBs:</label>
                    <select name="num_qb" value={this.state.num_qb} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>

                    <label>Num of RBs:</label>
                    <select name="num_rb" value={this.state.num_rb} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>

                    <label>Num of WRs:</label>
                    <select name="num_wr" value={this.state.num_wr} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <label>Num of TEs:</label>
                    <select name="num_te" value={this.state.num_te} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>

                    <label>Num of Flex:</label>
                    <select name="num_flex" value={this.state.num_flex} onChange={this.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <label>Num of Ks:</label>
                    <select name="num_k" value={this.state.num_k} onChange={this.handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>

                    <label>Num of D/STs:</label>
                    <select name="num_def" value={this.state.num_def} onChange={this.handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>

                    <label>Num SuperFlex:</label>
                    <select name="num_superflex" value={this.state.num_superflex} onChange={this.handleChange}>
                        <option value="0">0</option>
                        <option value="1">1</option>
                    </select>

                    <label>Num of Bench:</label>
                    <select name="num_bench" value={this.state.num_bench} onChange={this.handleChange}>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                <button type="submit">Submit</button>
                </form> 
                : 
                <div className='login alert'> 
                    <h2>You must login to create a team </h2> 
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

export default CreateTeam


/* 
    t.integer "user_id"
    t.string "name"
    t.integer "budget", default: 200
    t.integer "num_qb", default: 1
    t.integer "num_rb", default: 2
    t.integer "num_wr", default: 2
    t.integer "num_te", default: 1
    t.integer "num_flex", default: 1
    t.integer "num_k", default: 1
    t.integer "num_def", default: 1
    t.integer "num_superflex", default: 0
    t.integer "num_bench", default: 4

*/