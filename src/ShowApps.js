import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";

const ShowApps = () => {
  const [apps, setApps] = useState([]);

  const {
    getTokenSilently,
    loading,
    user,
  } = useAuth0();

  useEffect(() => {
    const getApps = async () => {
      try {
        const token = await getTokenSilently();
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch("http://localhost:8080/apps", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        setApps(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    getApps();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        <div className="row">
          {apps.map(function (app, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header">{app.Name}</div>
                  <div className="card-body">{app.Description}</div>
                  <div className="card-footer">
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowApps;