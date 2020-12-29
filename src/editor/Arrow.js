import React, { Component } from 'react';

const drawArrowHead = true
const arrowHeadLength = 21

class Arrow extends Component {

  slope(x1, y1, x2, y2) {
    return (y2 - y1) / (x2 - x1);
  };

  arrowHeadX(slope) {
    return arrowHeadLength / Math.sqrt(slope * slope + 1)
  }

  calcP1(slope) {
    var x = 0;
    var y = 0;

    if (slope === Infinity|| slope === -Infinity) {
      x = this.props.p1.x + this.props.blockWidth / 2;
      if (this.props.p1.y < this.props.p2.y) {
        y = this.props.p1.y + this.props.blockHeight;
      } else {
        y = this.props.p1.y;
      }
    } else {
      if (Math.abs(slope) <= this.slope(0,0,this.props.blockWidth,this.props.blockHeight)) {
        // right side
        if (this.props.p1.x < this.props.p2.x) {
          x = this.props.p1.x + this.props.blockWidth;
          y = this.props.p1.y + this.props.blockHeight / 2 + this.props.blockWidth / 2 * slope;
        }
        // left side
        else {
          x = this.props.p1.x;
          y = this.props.p1.y + this.props.blockHeight / 2 - this.props.blockWidth / 2 * slope;
        }
      } else {
        // top side
        if (this.props.p1.y > this.props.p2.y) {
          x = this.props.p1.x + this.props.blockWidth / 2 - (this.props.blockHeight / 2) / slope;
          y = this.props.p1.y;
        }
        // botton side
        else {
          x = this.props.p1.x + this.props.blockWidth / 2 + (this.props.blockHeight / 2) / slope;
          y = this.props.p1.y + this.props.blockHeight;
        }
      }
    }

    return ({
      x: x,
      y: y
    })
  };

  calcP2(slope) {
    var x = 0;
    var y = 0;

    if (slope === Infinity|| slope === -Infinity) {
      x = this.props.p2.x + this.props.blockWidth / 2;
      if (this.props.p1.y < this.props.p2.y) {
        y = this.props.p2.y - arrowHeadLength;
      } else {
        y = this.props.p2.y + this.props.blockHeight + arrowHeadLength;
      }
    } else {
      var arrowHeadX = this.arrowHeadX(slope);
      var arrowHeadY = arrowHeadX * slope;
  
      if (Math.abs(slope) <= this.slope(0,0,this.props.blockWidth,this.props.blockHeight)) {
        // right side
        if (this.props.p1.x < this.props.p2.x) {
          x = this.props.p2.x;
          y = this.props.p2.y + this.props.blockHeight / 2 - this.props.blockWidth / 2 * slope;
  
          if (drawArrowHead) {
            x -= arrowHeadX;
            y -= arrowHeadY;
          }
          console.log("right: " + arrowHeadX , "," + arrowHeadY + "slope:" + slope)
        }
        // left side
        else {
          x = this.props.p2.x + this.props.blockWidth;
          y = this.props.p2.y + this.props.blockHeight / 2 + this.props.blockWidth / 2 * slope;
          if (drawArrowHead) {
            x += arrowHeadX;
            y += arrowHeadY;
          }
          console.log("left: " + arrowHeadX , "," + arrowHeadY + "slope:" + slope)
        }
      } else {
        // top side
        if (this.props.p1.y > this.props.p2.y) {
          x = this.props.p2.x + this.props.blockWidth / 2 + (this.props.blockHeight / 2) / slope;
          y = this.props.p2.y + this.props.blockHeight;
          if (drawArrowHead) {
            if (this.props.p1.x < this.props.p2.x) {
              arrowHeadX = arrowHeadX * -1;
            }
            x += arrowHeadX
            y += Math.abs(arrowHeadY);
          }
          console.log("top: " + arrowHeadX , "," + arrowHeadY + "slope:" + slope)
         }
        // botton side
        else {
          x = this.props.p2.x + this.props.blockWidth / 2 - (this.props.blockHeight / 2) / slope;
          y = this.props.p2.y;
          if (drawArrowHead) {
            if (this.props.p1.x < this.props.p2.x) {
              arrowHeadX = arrowHeadX * -1;
            }
            x += arrowHeadX;
            y -= Math.abs(arrowHeadY);
          }
          console.log("bottom: " + arrowHeadX , "," + arrowHeadY + "slope:" + slope)
         }
      }
    }

    return ({
      x: x,
      y: y
    })
  };


  render() {
    var slope = this.slope(this.props.p1.x, this.props.p1.y, this.props.p2.x, this.props.p2.y);

    var p1 = this.calcP1(slope);
    var p2 = this.calcP2(slope);

    if (drawArrowHead) {
      return (
        <>
          <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="3.5" refX="0" refY="1.75" orient="auto">
              <polygon points="0 0, 5 1.75 0 3.5" />
            </marker>
          </defs>
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" strokeWidth="4" markerEnd="url(#arrowhead)" />
        </>
    )
    } else {
      return (
        <>
          <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" strokeWidth="4" />
        </>
    )
    }
  }
}

export default Arrow;