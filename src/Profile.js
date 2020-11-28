import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import ShowSlideshows from './ShowSlideshows';

const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth0();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!isAuthenticated || !user) {
    return (
      <div>
        <p>Select <b>Login</b> to continue.</p>
      </div>
    )
  }

  return (
      <div>
        <p><b>Welcome {user.name}!</b> Please review the apps below. </p>
        <div>
          <ShowSlideshows />
        </div>
      </div>
     )
};

export default Profile;