import React from 'react';
import ReactPlayer from 'react-player'
import { apiUrl } from '../URLs/urls'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

class Home extends React.Component {

  state = {
    articles: []
  }

  componentDidMount(){
    this.getArticles()
  }

  getArticles = () => {
    fetch(apiUrl+`/${this.props.userInfo.favTeam}`)
    .then(r => r.json())
    .then(articles => {
      this.setState({ articles })
    })
  }

  render() {
    console.log(this.state, this.props.userInfo.favTeam);
    return (
    <div className='homepage'>
        <h1>Welcome to Draft Projector</h1>
        <ReactPlayer url='https://www.youtube.com/watch?v=MUYuTw_8pQU'/>
        <Container fluid>
        {this.state.articles.articles ? this.state.articles.articles.map(art => 
          <Row>
          <Col >
            <Card className='news'>
            <Card.Img className='article image' src={art.urlToImage}/>
            <Card.Body>
            <Card.Link href={art.url}><h2>{art.title}</h2></Card.Link>            
            <Card.Text>by {art.author}</Card.Text>
            <Card.Text>{art.description}</Card.Text>
            </Card.Body>
            </Card>
          </Col>
          </Row>
          ) : 'loading...' }
          </Container> 

    </div>
    )
  }
}

export default Home;


// if no userId => send to nfl endpoint
// if userId => send to fav team 
       // ==> need a drop down for favorite team
