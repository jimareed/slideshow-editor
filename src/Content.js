import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import Slideshow from "./Slideshow"
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 

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

const Content = (props) => {
  const [isOpen, setIsOpen] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const {
    loading,
    isAuthenticated,
    user,
  } = useAuth0();

  function openSlideshow(name) {
    setSelectedData(SLIDESHOW_URI + "/"+name);
    setIsOpen(true);
  }

  useEffect(() => {
    setIsOpen(false);
    setSelectedData("")
  }, []);


  if (loading) {
    <div></div>
  }
  else if (!user || !isAuthenticated) {
    return (
      <div className="container">
        <div className="jumbotron text-center mt-5">
          <div className="row">
            {props.data.map(function (d, index) {
              return (
                <div className="col-sm-4" key={index}>
                  <div className="card mb-4">
                    <div className="card-header" style={cardHeaderStyles} onClick={(e) => openSlideshow(d.ResourceId)}>{d.Name}</div>
                    <div className="card-body" style={cardBodyStyles} onClick={(e) => openSlideshow(d.ResourceId)}>{d.Description}</div>
                    <div className="card-footer"  style={cardFooterStyles} >
                    </div>
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
    }
  else {
    return (
      <div className="container">
        <div className="jumbotron text-center mt-5">
          <div className="row">
            {props.data.map(function (d, index) {
              return (
                <div className="col-sm-4" key={index}>
                  <div className="card mb-4">
                    <div className="card-header" style={cardHeaderStyles} onClick={(e) => openSlideshow(d.ResourceId)}>{d.Name}</div>
                    <div className="card-body" style={cardBodyStyles} onClick={(e) => openSlideshow(d.ResourceId)}>{d.Description}</div>
                    <div className="card-footer"  style={cardFooterStyles} >
                      <button style={footerButtonStyles}><AiFillDelete/></button>
                      <button style={footerButtonStyles}><AiFillEdit/></button>
                    </div>
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
    }
};

export default Content;