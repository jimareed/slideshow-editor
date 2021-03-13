import React from "react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import { useAuth0 } from "./react-auth0-spa";
import Content from './Content';
import { CgAddR } from "react-icons/cg";

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
          <p>A reference application that contains basic elements of a cloud architecture including microservices, containerization, authentication and access control.</p>
          <p>Select a slideshow below or <b>Login</b> to create your own slideshow.</p>
          <div>
            <Content/>
          </div>
        </div>
      </Jumbotron>
    )
  }

  return (
    <Jumbotron>
        <div>
          <p><b>Welcome {user.name}!</b> Select a slideshow below or select <b>New <CgAddR/></b> to create your own slideshow.</p>
          <div>
            <Content />
          </div>
        </div>
    </Jumbotron>
     )
};

export default Body;