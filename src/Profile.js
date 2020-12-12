import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import ShowData from './ShowData';

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div>
        <p><b>Login</b> to continue.</p>
      </div>
    )
  }

  return (
      <div>
        <p><b>Welcome {user.name}!</b> Select a slideshow below to learn more about the application. </p>
        <div>
          <ShowData />
        </div>
      </div>
     )
};

export default Profile;