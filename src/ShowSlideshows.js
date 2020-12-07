import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import Slideshow from "./Slideshow"
import ContextMenu from "./ContextMenu"
import { FiMoreHorizontal } from "react-icons/fi";

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
  const [isContextOpen, setIsContextOpen] = useState([]);
  const [selectedSlideshow, setSelectedSlideshow] = useState([]);

  const {
    getTokenSilently,
    loading,
    user,
  } = useAuth0();

  function openSlideshow(name) {
    setSelectedSlideshow(SLIDESHOW_URI + "/"+name);
    setIsOpen(true);
  }

  function openContext(name) {
    setSelectedSlideshow(name);
    setIsContextOpen(false);
  }

  useEffect(() => {
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

    getSlideshows();
    setIsOpen(false);
    setIsContextOpen(false);
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
                    <button style={footerButtonStyles} onClick={(e) => openContext(slideshow.Id)}><FiMoreHorizontal/></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Slideshow isOpen={isOpen} slideshow={selectedSlideshow} onClose={(e) => setIsOpen(false)}>
      </Slideshow>
      <ContextMenu isOpen={isContextOpen} slideshow={selectedSlideshow} onClose={(e) => setIsContextOpen(false)}>
      </ContextMenu>
    </div>
  );
};

export default ShowSlideshows;