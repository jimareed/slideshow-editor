import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useAuth0 } from "./react-auth0-spa";
import Content from './Content';

const Body = (props) => {
  const { user, isAuthenticated, loading } = useAuth0();

  if (loading) {
    return (
      <Jumbotron>
        <div>Loading ...</div>
      </Jumbotron>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <Jumbotron>
        <div>
          <p>Select a slideshow below to learn more about <b>Slideshow Editor</b>.</p>
          <p><b>Login</b> to create your own slideshow.</p>
          <div>
            <Content data={props.data}/>
          </div>
        </div>
      </Jumbotron>
    )
  }

  return (
    <Jumbotron>
        <div>
          <p><b>Welcome {user.name}!</b> Select a slideshow below to learn more about <b>Slideshow Editor</b>. </p>
          <p>Select <b>New</b> to create your own slideshow.</p>
          <div>
            <Content  data={props.data} />
          </div>
        </div>
    </Jumbotron>
     )
};

export default Body;