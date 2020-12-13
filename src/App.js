import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import './App.css';
import Body from './Body';
import TopBar from './TopBar';


const App = () => {
  return (
    <Container className="p-3">
    <TopBar/>
    <Jumbotron>
      <Body/>
    </Jumbotron>
  </Container>
  );
}

export default App;
