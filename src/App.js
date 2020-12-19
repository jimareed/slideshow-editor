import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import './App.css';
import Body from './Body';
import TopBar from './TopBar';
import { useAuth0 } from "./react-auth0-spa";

const SLIDESHOW_DATA_URI = process.env.REACT_APP_SLIDESHOW_DATA_URI || "" 

const defaultData = [
  {
    id: 1,
    ResourceId: "default",
    Name: "Slideshow",
    Description: "Overview",
    Permissions: ""
  },
  {
    id: 2,
    ResourceId: "instructions",
    Name: "Instructions",
    Description: "Steps to use",
    Permissions: ""
  },
  {
    id: 3,
    ResourceId: "emotional-intelligence",
    Name: "Emotional Intelligence",
    Description: "Sample slideshow",
    Permissions: ""
  }
]

const App = () => {
  const [data, setData] = useState([]);

  const { getTokenSilently, loading, isAuthenticated, user } = useAuth0();

  const getData = async () => {
    if (!user || !isAuthenticated) {
      console.log("use default data");
      setData(defaultData)
    } else {
      try {
        const token = await getTokenSilently();
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch(SLIDESHOW_DATA_URI + "/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const responseData = await response.json();
  
        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const newData = async (dataId) => {

    try {
      const token = await getTokenSilently();
      // Send a GET request to the server and add the signed in user's
      // access token in the Authorization header
      const response = await fetch(SLIDESHOW_DATA_URI + "/data", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

    } catch (error) {
      console.error(error);
    }

    getData()
  };

  useEffect(() => {
    getData();
  });


  return (
    <Container className="p-3">
      <TopBar newSlideshow={newData} />
      <Body data={data} />
    </Container>
  );
}

export default App;
