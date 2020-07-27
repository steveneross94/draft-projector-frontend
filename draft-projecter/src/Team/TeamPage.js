import React from 'react';
import RenderTeam from './RenderTeam'
import PlayerPool from './PlayerPool'
const teamUrl = 'http://localhost:3000/api/v1/teams'
const rosterUrl = 'http://localhost:3000/api/v1/rosters'

initialState={
  teamName: '',
  budget: null,
  numQB: null,
  numRB: null, 
  numWR: null, 
  numTE: null 
  numFlex: null,
  numK: null, 
  numDef: null, 
  numSuperFlex: null, 
  numBench: null, 
  playerPool: []
}
class TeamPage extends React.Component {
 state=initialState
 render() {
   return (
    <div>
        <div><PlayerPool /></div>
        <div><RenderTeam/> </div>
        <h1>Hello Team</h1>
        <h2>{this.props.userInfo.username}</h2>
        <h3>{this.props.userInfo.favTeam}</h3>
        <h3>{this.props.userInfo.id}</h3>
     </div>
   )
 }
}

export default TeamPage;
