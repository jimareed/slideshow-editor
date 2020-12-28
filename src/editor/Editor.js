import React, { useState, useEffect } from 'react';
import Canvas from "./Canvas";
import { useAuth0 } from "../react-auth0-spa";

  
let editorStyles = {
    width: '1024px',
    height: '768px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#FFFFFF',
    border: '2px solid black',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
}

let editorCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
}


const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 


const Editor = (props) => {

  const [slideshow, setSlideshow] = useState({
    width: 1024,
    height:768,
    rectWidth:180,
    rectHeight:120,
    shapes: []
  });

  const {
    getTokenSilently,
  } = useAuth0();

  useEffect(() => {
    getSpec()
  }, [props]);


  const getSpec = async () => {
    try {
      const token = await getTokenSilently();
      // Send a GET request to the server and add the signed in user's
      // access token in the Authorization header
      const response = await fetch(SLIDESHOW_URI + "/specs/" + props.item.ResourceId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const responseData = await response.json();
  
      if (responseData.specification == "") {
        setSlideshow({
          width: 1024,
          height:768,
          rectWidth:180,
          rectHeight:120,
          shapes: []
        })
      } else {
        setSlideshow(JSON.parse(responseData.specification));
      }

    } catch (error) {
      console.error(error);
    }
  };
  
  const updateSpec = async (spec) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(SLIDESHOW_URI + `/specs/` + props.item.ResourceId,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: "1", specification: spec }),
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
  
  function removeShape(index) {

    var s = {
      width: 1024,
      height:768,
      rectWidth:180,
      rectHeight:120,
      shapes: []
    }

    slideshow.shapes.forEach(function (shape, i) { 
      if (index !== i) {
        s.shapes.unshift(shape)
      }
    })

    return s

  }

  function addShape(shape) {

    var s = {
      width: 1024,
      height:768,
      rectWidth:180,
      rectHeight:120,
      shapes: []
    }

    slideshow.shapes.forEach(function (sh, i) { 
      s.shapes.unshift(sh)
    })

    s.shapes.unshift(shape)
    return s

  }

  function onUpdate(operation, shape, index) {
    if (operation === "add") {
      setSlideshow(addShape(shape))
    } else {
      setSlideshow(removeShape(index))
    }
  }

  function onClose() {

    updateSpec(JSON.stringify(slideshow))

    props.onClose()
  }

  return (
      <>
        {props.isOpen && (
          <div style={editorStyles}>
            <button style={editorCloseButtonStyles} onClick={onClose}>x</button>
            <Canvas slideshow={slideshow} onUpdate={onUpdate}/>
          </div>
        )}
      </>
    );
}

export default Editor;