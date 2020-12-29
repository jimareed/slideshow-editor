import React, { useState, useEffect } from "react";


const Canvas = (props) => {

  const [arrowFrom, setArrowFrom] = useState(-1);

  useEffect(() => {
    setArrowFrom(-1)
  }, []);

  const onRectClick = (index) => {

    if (props.isArrowMode) {
      if (arrowFrom === index) {
        setArrowFrom(-1)
      } else if (arrowFrom !== -1) {
        props.onUpdate("addConnector", {}, {}, "", arrowFrom, index)
        setArrowFrom(-1)
      } else {
        setArrowFrom(index)
      }
    } else {
      setArrowFrom(-1)
      props.onUpdate("remove", {}, {}, "", index, 0)
    }
  };  

  const getRelativePosition = (e, rectWidth, rectHeight) => {
    var canvas = document.getElementById('editor-canvas');
    var clientRect = canvas.getBoundingClientRect();

    return { x: e.clientX - clientRect.x - rectWidth/2, y: e.clientY - clientRect.y - rectHeight/2}
  }

  const onCanvasClick = (e) => {

    if (!props.isArrowMode) {
      var pos = getRelativePosition(e, 180, 120)

      var shape = {
        x: pos.x,
        y: pos.y,
        width: 180,
        height: 120,
        type: "rect",
        desc: "",
        size: 0,
        style: "",
        slide: ""
      }
  
      props.onUpdate("add", shape, {}, "", 0, 0)
    } 
  };  

  return (
    <svg width="1024" height="768" >
      <rect x="0" y="0" id="editor-canvas" width="1024" height="768" stroke="white" fill="transparent" strokeWidth="0"
              onClick={(e) => onCanvasClick(e)} 
      />
      {props.slideshow.shapes.map(function (s, index) {
        return (
          <rect x={s.x} y={s.y} id={index} width={s.width} height={s.height} stroke="black" fill="transparent" strokeWidth="4"
            onClick={ () => onRectClick(index) } 
          />
        );
      })}
      {props.slideshow.connectors.map(function (c, index) {
        return (
          <>
          </>
        );
      })}
      {arrowFrom >= 0 && props.isArrowMode && (
        <rect 
          x={props.slideshow.shapes[arrowFrom].x-2} 
          y={props.slideshow.shapes[arrowFrom].y-2} 
          width={props.slideshow.rectWidth + 4} 
          height={props.slideshow.rectHeight + 4} 
          stroke="red" fill="transparent" strokeWidth="2" 
          onClick={ () => onRectClick(arrowFrom) }
        /> 
      )}     
      {props.slideshow.shapes.length === 0 && (
        <>
          <text x="50%" y="24vh" stroke="lightgrey" textAnchor="middle" fill="lightgrey" fontWeight="2" fontSize="20" onClick={(e) => onCanvasClick(e)} >click on the canvas to add a block</text>
          <text x="50%" y="28vh" stroke="lightgrey" textAnchor="middle" fill="lightgrey" fontWeight="5" fontSize="20" onClick={(e) => onCanvasClick(e)} >click on a block to delete it</text>
          <text x="50%" y="32vh" stroke="lightgrey" textAnchor="middle" fill="lightgrey" fontWeight="5" fontSize="20" onClick={(e) => onCanvasClick(e)} >use arrows to connect blocks</text>
        </>
      )}     

    </svg>
  );
}

export default Canvas;
