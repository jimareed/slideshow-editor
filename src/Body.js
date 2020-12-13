import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import Content from './Content';

const Body = () => {
  const { user, isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div>
        <p>Select a slideshow below to learn more about <b>Slideshow Editor</b>.</p>
        <p><b>Login</b> to create your own slideshow.</p>
        <div>
          <Content />
        </div>
      </div>
    )
  }

  return (
      <div>
        <p><b>Welcome {user.name}!</b> Select a slideshow below to learn more about <b>Slideshow Editor</b>. </p>
        <p>Select <b>New</b> to create your own slideshow.</p>
        <div>
          <Content />
        </div>
      </div>
     )
};

export default Body;