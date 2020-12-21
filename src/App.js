import React from "react";
import Container from 'react-bootstrap/Container';
import './App.css';
import Body from './Body';
import TopBar from './TopBar';


const App = () => {


  return (
    <Container className="p-3">
      <TopBar />
      <Body />
    </Container>
  );
}

export default App;
