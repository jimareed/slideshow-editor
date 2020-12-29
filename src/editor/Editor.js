import React, { useState, useEffect } from 'react';
import Canvas from "./Canvas";
import Properties from "./Properties";
import Settings from "./Settings";
import { useAuth0 } from "../react-auth0-spa";
import { TiEdit } from "react-icons/ti";
import { BsArrowUpRight } from "react-icons/bs"
import { BiRectangle } from "react-icons/bi"
import { FiSettings } from "react-icons/fi";
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

const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 


const Editor = (props) => {

  const [isRectMode, setIsRectMode] = useState(true);
  const [isArrowMode, setIsArrowMode] = useState(false);
  const [isPropertiesMode, setIsPropertiesMode] = useState(false);
  const [isSettingsMode, setIsSettingsMode] = useState(false);

  const [slideshow, setSlideshow] = useState({
    width: 1024,
    height:768,
    rectWidth:180,
    rectHeight:120,
    shapes: [],
    connectors: [],
    transitions: []
  });

  const [settings, setSettings] = useState({
    name: "",
    description:""
  });

  const {
    getTokenSilently,
  } = useAuth0();

  useEffect(() => {
    getSpec()
    setMode("rect")
    setSettings({ name: props.item.Name, description: props.item.Description })
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
          shapes: [],
          connectors: [],
          transitions: []      
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
      shapes: [],
      connectors: [],
      transitions: []
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
      setIsSettingsMode(false)
    } else if (mode === "arrow") {
      setIsRectMode(false)
      setIsArrowMode(true)
      setIsPropertiesMode(false)  
      setIsSettingsMode(false)
    } else if (mode === "settings") {
      setIsRectMode(false)
      setIsArrowMode(false)
      setIsPropertiesMode(false)  
      setIsSettingsMode(true)
    } else {
      setIsRectMode(false)
      setIsArrowMode(false)
      setIsPropertiesMode(true)
      setIsSettingsMode(false)
    }
  }

  function addShape(shape) {

    var s = {
      width: 1024,
      height:768,
      rectWidth:180,
      rectHeight:120,
      shapes: [],
      connectors: [],
      transitions: []
    }

    s.shapes.unshift(shape)

    slideshow.shapes.forEach(function (sh, i) { 
      s.shapes.unshift(sh)
    })

    slideshow.connectors.forEach(function (c, i) { 
      s.connectors.unshift(c)
    })

    return s
  }

  function addConnector(index1, index2) {

    var s = {
      width: 1024,
      height:768,
      rectWidth:180,
      rectHeight:120,
      shapes: [],
      connectors: [],
      transitions: []
    }

    var connector = {
      shape1: index1,
      shape2: index2
    }

    slideshow.shapes.forEach(function (sh, i) { 
      s.shapes.unshift(sh)
    })

    s.connectors.unshift(connector)

    slideshow.connectors.forEach(function (c, i) { 
      s.connectors.unshift(c)
    })

    return s
  }


  function onUpdate(operation, shape, settings, spec, index, index2) {
    if (operation === "add") {
      setSlideshow(addShape(shape))
    } else if (operation === "addConnector") {
      setSlideshow(addConnector(index, index2));
    } else if (operation === "updateSettings") {
      setSettings(settings)
    } else if (operation === "updateSpec") {
      setSlideshow(JSON.parse(spec));
    } else {
      setSlideshow(removeShape(index))
    }
}

  function onClose() {

    updateSpec(JSON.stringify(slideshow))

    if ((props.item.Name !== settings.name) || (props.item.Description !== settings.description)) {
      var item = {
        Id: props.item.Id,
        Name: settings.name,
        Description: settings.description
      }
      console.log(item)
      props.onUpdate(item)
    }

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
                      <Button onClick={ () => setMode("settings") }variant="light"><FiSettings/></Button>
                    </ButtonGroup>
                  )}
                  {isArrowMode && (
                    <ButtonGroup>
                      <Button onClick={ () => setMode("rect") }variant="light"><BiRectangle/></Button>
                      <Button onClick={ () => setMode("arrow") }variant="primary"><BsArrowUpRight/></Button>
                      <Button onClick={ () => setMode("properties") }variant="light"><TiEdit/></Button>
                      <Button onClick={ () => setMode("settings") }variant="light"><FiSettings/></Button>
                    </ButtonGroup>
                  )}
                  {isPropertiesMode && (
                    <ButtonGroup>
                      <Button onClick={ () => setMode("rect") }variant="light"><BiRectangle/></Button>
                      <Button onClick={ () => setMode("arrow") }variant="light"><BsArrowUpRight/></Button>
                      <Button onClick={ () => setMode("properties") }variant="primary"><TiEdit/></Button>
                      <Button onClick={ () => setMode("settings") }variant="light"><FiSettings/></Button>
                    </ButtonGroup>
                  )}
                  {isSettingsMode && (
                    <ButtonGroup>
                      <Button onClick={ () => setMode("rect") }variant="light"><BiRectangle/></Button>
                      <Button onClick={ () => setMode("arrow") }variant="light"><BsArrowUpRight/></Button>
                      <Button onClick={ () => setMode("properties") }variant="light"><TiEdit/></Button>
                      <Button onClick={ () => setMode("settings") }variant="primary"><FiSettings/></Button>
                    </ButtonGroup>
                  )}
                </Col>
                <Col/>
                <Col/>
                <Col/>
              </Row>
              <Row>
                  <Col>
                    {(isRectMode || isArrowMode) && (
                      <Canvas slideshow={slideshow} isArrowMode={isArrowMode} onUpdate={onUpdate}/>
                    )}
                    {isPropertiesMode && (
                      <Properties slideshow={slideshow} onUpdate={onUpdate}/>
                    )}
                    {isSettingsMode && (
                      <Settings settings={settings} onUpdate={onUpdate}/>
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