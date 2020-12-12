import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import Slideshow from "./Slideshow"
import { FiMoreHorizontal } from "react-icons/fi";
import {Menu, Item, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';

const MENU_ID = 'menu-1';

const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 
const SLIDESHOW_DATA_URI = process.env.REACT_APP_SLIDESHOW_DATA_URI || "" 

let footerButtonStyles = {
  marginBottom: '15px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  width: '30px',
  height: '30px',
  fontWeight: 'bold',
  alignSelf: 'flex-end',
  float: 'right'
}

let cardHeaderStyles = {
  height: '60px',
  cursor: 'pointer'
}

let cardBodyStyles = {
  height: '100px',
  cursor: 'pointer'
}

let cardFooterStyles = {
  height: '50px',
}

const ShowData = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const { show } = useContextMenu({
    id: MENU_ID
  });

  const {
    getTokenSilently,
    loading,
    user,
  } = useAuth0();

  function openData(name) {
    setSelectedData(SLIDESHOW_URI + "/"+name);
    setIsOpen(true);
  }

  const getData = async () => {
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
  };

  const duplicateData = async (dataId) => {

    console.log("duplicate " + dataId)

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
    setIsOpen(false);
    setSelectedData("")
  }, []);

  const action = () => {
  };


  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        <div className="row">
          {data.map(function (d, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header" style={cardHeaderStyles} onClick={(e) => openData(d.Id)}>{d.Name}</div>
                  <div className="card-body" style={cardBodyStyles} onClick={(e) => openData(d.Id)}>{d.Description}</div>
                  <div className="card-footer"  style={cardFooterStyles} >
                    <button style={footerButtonStyles} onClick={show}><FiMoreHorizontal/></button>
                  </div>
                  <Menu id={MENU_ID}>
                    <Item id="duplicate" onClick={(e) => duplicateData(d.Id)}>
                      Duplicate
                    </Item>
                  </Menu>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Slideshow isOpen={isOpen} slideshow={selectedData} onClose={(e) => setIsOpen(false)}>
      </Slideshow>
    </div>
  );
};

export default ShowData;