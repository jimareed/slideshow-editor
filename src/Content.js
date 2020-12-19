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
    getTokenSilently,
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

  const updateData = async (id, description) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(
        `http://localhost:8080/data/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ description: description }),
        }
      );
      // Since this is just for demonstration and we're not actually
      // persisting this data, we'll just set the product vote status here
      // if the product exists
      if (response.ok) {
      } else console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id, description) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(
        `http://localhost:8080/data/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Since this is just for demonstration and we're not actually
      // persisting this data, we'll just set the product vote status here
      // if the product exists
      if (response.ok) {
      } else console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };


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
                      {d.Permissions.includes("write") && (
                        <button onClick={() => deleteData(d.Id)} style={footerButtonStyles}><AiFillDelete/></button>
                      )}
                      {d.Permissions.includes("write") && (
                        <button onClick={() => updateData(d.Id, d.Description)} style={footerButtonStyles}><AiFillEdit/></button>
                      )}
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