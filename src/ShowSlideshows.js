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

const ShowSlideshows = () => {
  const [slideshows, setSlideshows] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [selectedSlideshow, setSelectedSlideshow] = useState([]);

  const { show } = useContextMenu({
    id: MENU_ID
  });

  function handleItemClick({ event, props, triggerEvent, data }){
    console.log("item clicked!" );
    console.log(event.currentTarget.id);
  }

  const {
    getTokenSilently,
    loading,
    user,
  } = useAuth0();

  function openSlideshow(name) {
    setSelectedSlideshow(SLIDESHOW_URI + "/"+name);
    setIsOpen(true);
  }

  const getSlideshows = async () => {
    try {
      const token = await getTokenSilently();
      // Send a GET request to the server and add the signed in user's
      // access token in the Authorization header
      const response = await fetch(SLIDESHOW_DATA_URI + "/slideshows", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setSlideshows(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const duplicateSlideshow = async () => {
    try {
      const token = await getTokenSilently();
      // Send a GET request to the server and add the signed in user's
      // access token in the Authorization header
      const response = await fetch(SLIDESHOW_DATA_URI + "/slideshows", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

    } catch (error) {
      console.error(error);
    }

    getSlideshows()
  };

  useEffect(() => {

    getSlideshows();
    setIsOpen(false);
    setSelectedSlideshow("")
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
          {slideshows.map(function (slideshow, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header" style={cardHeaderStyles} onClick={(e) => openSlideshow(slideshow.Id)}>{slideshow.Name}</div>
                  <div className="card-body" style={cardBodyStyles} onClick={(e) => openSlideshow(slideshow.Id)}>{slideshow.Description}</div>
                  <div className="card-footer"  style={cardFooterStyles} >
                    <button style={footerButtonStyles} onClick={show}><FiMoreHorizontal/></button>
                  </div>
                  <Menu id={MENU_ID}>
                    <Item id="item-1" onClick={handleItemClick}>
                      Item 1
                    </Item>
                    <Item id="item-2" onClick={handleItemClick}>
                      Item 2
                    </Item>
                  </Menu>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Slideshow isOpen={isOpen} slideshow={selectedSlideshow} onClose={(e) => setIsOpen(false)}>
      </Slideshow>
    </div>
  );
};

export default ShowSlideshows;