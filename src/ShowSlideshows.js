import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import Slideshow from "./Slideshow"

const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 
const SLIDESHOW_DATA_URI = process.env.REACT_APP_SLIDESHOW_DATA_URI || "" 


let cardStyles = {
  cursor: 'pointer'
}

const ShowSlideshows = () => {
  const [slideshows, setSlideshows] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
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
    setSelectedSlideshow("")
  }, []);

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
                <div className="card mb-4" style={cardStyles}>
                  <div className="card-header" onClick={(e) => openSlideshow(slideshow.Id)}>{slideshow.Name}</div>
                  <div className="card-body" onClick={(e) => openSlideshow(slideshow.Id)}>{slideshow.Description}</div>
                  <div className="card-footer" onClick={(e) => openSlideshow(slideshow.Id)}></div>
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