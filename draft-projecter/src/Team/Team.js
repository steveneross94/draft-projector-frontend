import React from 'react';


class Team extends React.Component {
 render() {
   return (
    <div>
        <h1>Hello Team</h1>
        <h2>{this.props.userInfo.username}</h2>
        <h3>{this.props.userInfo.favTeam}</h3>
        <h3>{this.props.userInfo.id}</h3>
     </div>
   )
 }
}

export default Team;
