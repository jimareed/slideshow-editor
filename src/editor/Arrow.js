import React, { useState, useEffect } from "react";

const arrowHeadLength = 21


const Arrow = (props) => {

  const [p1, setP1] = useState({x:0,y:0});
  const [p2, setP2] = useState({x:0,y:0});


  useEffect(() => {

    function calcArrowHeadX(slope) {
      return arrowHeadLength / Math.sqrt(slope * slope + 1)
    }
    
    function calcSlope(x1, y1, x2, y2) {
      return (y2 - y1) / (x2 - x1);
    }

    function calcP1(slope, x1, y1, x2, y2, rectWidth, rectHeight) {
      var x = 0;
      var y = 0;
  
      if (slope === Infinity|| slope === -Infinity) {
        x = x1 + rectWidth / 2;
        if (y1 < y2) {
          y = y1 + rectHeight;
        } else {
          y = y1;
        }
      } else {
        if (Math.abs(slope) <= calcSlope(0,0,rectWidth, rectHeight)) {
          // right side
          if (x1 < x2) {
            x = x1 + rectWidth;
            y = y1 + rectHeight / 2 + rectWidth / 2 * slope;
          }
          // left side
          else {
            x = x1;
            y = y1 + rectHeight / 2 - rectWidth / 2 * slope;
          }
        } else {
          // top side
          if (y1 > y2) {
            x = x1 + rectWidth / 2 - (rectHeight / 2) / slope;
            y = y1;
          }
          // botton side
          else {
            x = x1 + rectWidth / 2 + (rectHeight / 2) / slope;
            y = y1 + rectHeight;
          }
        }
      }

      return {x: x, y: y}
    }
  
    function calcP2(slope, x1, y1, x2, y2, rectWidth, rectHeight) {
      var x = 0;
      var y = 0;
  
      if (slope === Infinity|| slope === -Infinity) {
        x = x2 + rectWidth / 2;
        if (y1 < y2) {
          y = y2 - arrowHeadLength;
        } else {
          y = y2 + rectHeight + arrowHeadLength;
        }
      } else {
        var arrowHeadX = calcArrowHeadX(slope);
        var arrowHeadY = arrowHeadX * slope;
    
        if (Math.abs(slope) <= calcSlope(0,0,rectWidth,rectHeight)) {
          // right side
          if (x1 < x2) {
            x = x2;
            y = y2 + rectHeight / 2 - rectWidth / 2 * slope;
            x -= arrowHeadX;
            y -= arrowHeadY;
          }
          // left side
          else {
            x = x2 + rectWidth;
            y = y2 + rectHeight / 2 + rectWidth / 2 * slope;
            x += arrowHeadX;
            y += arrowHeadY;
          }
        } else {
          // top side
          if (y1 > y2) {
            x = x2 + rectWidth / 2 + (rectHeight / 2) / slope;
            y = y2 + rectHeight;
            if (x1 < x2) {
              arrowHeadX = arrowHeadX * -1;
            }
            x += arrowHeadX
            y += Math.abs(arrowHeadY);
           }
          // botton side
          else {
            x = x2 + rectWidth / 2 - (rectHeight / 2) / slope;
            y = y2;
            if (x1 < x2) {
              arrowHeadX = arrowHeadX * -1;
            }
            x += arrowHeadX;
            y -= Math.abs(arrowHeadY);
           }
        }
      }
  
      return ({x: x, y: y})
    }
  
    var sl = calcSlope(props.shape1.x, props.shape1.y, props.shape2.x, props.shape2.y);

    setP1(calcP1(sl, props.shape1.x, props.shape1.y, props.shape2.x, props.shape2.y, props.rectWidth, props.rectHeight))
    setP2(calcP2(sl, props.shape1.x, props.shape1.y, props.shape2.x, props.shape2.y, props.rectWidth, props.rectHeight))
  }, [props]);



  return (
    <>
      <defs>
        <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
          <polygon points="0 0, 5 1.75 0 3.5" />
        </marker>
      </defs>
      <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" strokeWidth="4" markerEnd="url(#arrowhead)" />
    </>
  );
}

export default Arrow;
