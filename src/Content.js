import React, {useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import Slideshow from "./Slideshow"
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import EditData from "./EditData"
import { Modal } from 'react-bootstrap'


const SLIDESHOW_DATA_URI = process.env.REACT_APP_SLIDESHOW_DATA_URI || "" 
const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 

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

let newBodyStyles = {
  cursor: 'pointer',
  height: '100px',
}

let newStyles = {
  cursor: 'pointer',
  height: '50px',
}

const Content = (props) => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState([]);
  const [selectedSlideshow, setSelectedSlideshow] = useState([]);
  const [selectedDataItem, setSelectedDataItem] = useState([]);

  const {
    getTokenSilently,
    loading,
    isAuthenticated,
    user,
  } = useAuth0();

  function openEditDialog(index) {
    setSelectedDataItem(data[index])
    setIsEditOpen(true);
  }

  const handleClose = () => setIsEditOpen(false);

  const onUpdate = (dataItem) => {
    updateData(dataItem.Id, dataItem.Name, dataItem.Description)
    setIsEditOpen(false);
  };

  function openSlideshow(name) {
    setSelectedSlideshow(SLIDESHOW_URI + "/"+name);
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

  useEffect(() => {

    if (!user || !isAuthenticated) {
      setData(defaultData)
    } else {
      getData();    
    }
    setIsOpen(false);
    setIsEditOpen(false);
    setSelectedSlideshow("")
  }, [isAuthenticated, user]);

  const updateData = async (id, name, description) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(SLIDESHOW_DATA_URI + `/data/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: name, description: description }),
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
      const response = await fetch(SLIDESHOW_DATA_URI + `/data/${id}`,
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

    getData()
  };

  const newData = async () => {

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

      await response.json();

    } catch (error) {
      console.error(error);
    }

    getData()
  };
  
  if (loading) {
    <div></div>
  }
  else {
    return (
      <div className="container">
        <div className="jumbotron text-center mt-5">
          <div className="row">
            {data.map(function (d, index) {
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
                        <button onClick={() => openEditDialog(index)} style={footerButtonStyles}><AiFillEdit/></button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {isAuthenticated && user && (
              <div className="col-sm-4" key="new-item">
                <div className="card mb-4">
                <div className="card-header" style={cardHeaderStyles} onClick={(e) => newData()}></div>
                  <div className="card-body" style={newBodyStyles} onClick={(e) => newData()}><h1><CgAddR/></h1></div>
                  <div className="card-footer" style={newStyles} onClick={(e) => newData()}></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Modal show={isEditOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Slideshow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditData item={selectedDataItem} onUpdate={onUpdate} />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
        </Modal>
        <Slideshow isOpen={isOpen} slideshow={selectedSlideshow} onClose={(e) => setIsOpen(false)}>
        </Slideshow>
      </div>
    );
    }
};

export default Content;