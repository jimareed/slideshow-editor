import React, {useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import Slideshow from "./Slideshow"
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { CgAddR } from "react-icons/cg";
import Editor from "./editor/Editor"


const SLIDESHOW_DATA_URI = process.env.REACT_APP_SLIDESHOW_DATA_URI || "" 
const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 

const defaultData = [
  {
    Id: 1,
    ResourceId: "default",
    Name: "Slideshow",
    Description: "Overview",
    Permissions: ""
  },
  {
    Id: 2,
    ResourceId: "instructions",
    Name: "Instructions",
    Description: "Steps to use",
    Permissions: ""
  },
  {
    Id: 3,
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
  const [isOpen, setIsOpen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedSlideshow, setSelectedSlideshow] = useState([]);
  const [selectedDataItem, setSelectedDataItem] = useState([]);

  const {
    getTokenSilently,
    loading,
    isAuthenticated,
    user,
  } = useAuth0();

  const onUpdate = (dataItem) => {
    updateData(dataItem.Id, dataItem.Name, dataItem.Description)
  };

  function openSlideshow(name) {
    setSelectedSlideshow(SLIDESHOW_URI + "/slideshows/"+name);
    setIsOpen(true);
  }

  function openEditor(index) {
    setSelectedDataItem(data[index])
    setIsEditorOpen(true);
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
    setIsEditorOpen(false);
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
        getData()
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
      const response = await fetch(SLIDESHOW_URI + "/specs", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let responseBody = await response.json();

      try {
        const token = await getTokenSilently();
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch(SLIDESHOW_DATA_URI + "/data", {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ resourceId: responseBody.id }),
        });
  
        await response.json();
  
      } catch (error) {
        console.error(error);
      }
  
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
                        <button onClick={() => openEditor(index)} style={footerButtonStyles}><AiFillEdit/></button>
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
        <Slideshow isOpen={isOpen} slideshow={selectedSlideshow} onClose={(e) => setIsOpen(false)}>
        </Slideshow>
        <Editor isOpen={isEditorOpen} onUpdate={onUpdate} item={selectedDataItem} onClose={(e) => setIsEditorOpen(false)}>
        </Editor>
      </div>
    );
    }
};

export default Content;