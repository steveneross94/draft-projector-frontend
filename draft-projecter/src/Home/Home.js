import React from 'react';
import ReactPlayer from 'react-player'


class Home extends React.Component {
  render() {
    return (
    <div className='homepage'>
        <h1>Welcome to Draft Projector</h1>
        <ReactPlayer url='https://www.youtube.com/watch?v=MUYuTw_8pQU'/>
    </div>
    )
  }
}

export default Home;
