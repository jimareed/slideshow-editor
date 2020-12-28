import React, { useState, useEffect } from 'react';
import Canvas from "./Canvas";
import Properties from "./Properties";
import { useAuth0 } from "../react-auth0-spa";
import { TiEdit } from "react-icons/ti";
import { BsArrowUpRight } from "react-icons/bs"
import { BiRectangle } from "react-icons/bi"
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap"


  
let editorStyles = {
    width: '1024px',
    height: '800px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '40%',
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

let editorToolbarButtonStyles = {
  marginBottom: '15px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '50%',
  backgroundColor: '#FFFFFF',
  border: 'none',
  width: '30px',
  height: '30px',
  fontWeight: 'bold',
  alignSelf: 'center'
}

const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 


const Editor = (props) => {

  const [isRectMode, setIsRectMode] = useState(true);
  const [isArrowMode, setIsArrowMode] = useState(false);
  const [isPropertiesMode, setIsPropertiesMode] = useState(false);

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
    setMode("rect")
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
  
      if (responseData.specification === "") {
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

  function setMode(mode) {
    if (mode === "rect") {
      setIsRectMode(true)
      setIsArrowMode(false)
      setIsPropertiesMode(false)
    } else if (mode === "arrow") {
      setIsRectMode(false)
      setIsArrowMode(true)
      setIsPropertiesMode(false)  
    } else {
      setIsRectMode(false)
      setIsArrowMode(false)
      setIsPropertiesMode(true)
    }
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

  function onUpdate(operation, shape, spec, index) {
    if (operation === "add") {
      setSlideshow(addShape(shape))
    } else if (operation === "updateSpec") {
      setSlideshow(JSON.parse(spec));
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
            <Container>
            <Row>
                <Col/>
                <Col/>
                <Col/>
                <Col>
                  {isRectMode && (
                    <ButtonGroup>
                      <Button onClick={ () => setMode("rect") } variant="primary"><BiRectangle/></Button>
                      <Button onClick={ () => setMode("arrow") }variant="light"><BsArrowUpRight/></Button>
                      <Button onClick={ () => setMode("properties") }variant="light"><TiEdit/></Button>
                    </ButtonGroup>
                  )}
                  {isArrowMode && (
                    <ButtonGroup>
                      <Button onClick={ () => setMode("rect") }variant="light"><BiRectangle/></Button>
                      <Button onClick={ () => setMode("arrow") }variant="primary"><BsArrowUpRight/></Button>
                      <Button onClick={ () => setMode("properties") }variant="light"><TiEdit/></Button>
                    </ButtonGroup>
                  )}
                  {isPropertiesMode && (
                    <ButtonGroup>
                      <Button onClick={ () => setMode("rect") }variant="light"><BiRectangle/></Button>
                      <Button onClick={ () => setMode("arrow") }variant="light"><BsArrowUpRight/></Button>
                      <Button onClick={ () => setMode("properties") }variant="primary"><TiEdit/></Button>
                    </ButtonGroup>
                  )}
                </Col>
                <Col/>
                <Col/>
                <Col/>
              </Row>
              <Row>
                  <Col>
                    {!isPropertiesMode && (
                      <Canvas slideshow={slideshow} onUpdate={onUpdate}/>
                    )}
                    {isPropertiesMode && (
                      <Properties slideshow={slideshow} onUpdate={onUpdate}/>
                    )}
                  </Col>
              </Row>
            </Container>
          </div>
        )}
      </>
    );
}

export default Editor;