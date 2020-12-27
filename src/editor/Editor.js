import React, { Component } from 'react';
import Canvas from "./Canvas";

const defaultSlideshow = {
    width: 1024,
    height:768,
    rectWidth:180,
    rectHeight:120,
    shapes: [
        {
        x: 250,
        y: 100,
        width: 180,
        height: 120,
        type: "rect",
        desc: "",
        size: 0,
        style: "",
        slide: ""
        },
        {
            x: 600,
            y: 200,
            width: 180,
            height: 120,
            type: "rect",
            desc: "",
            size: 0,
            style: "",
            slide: ""
            }
        ]
}
  
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

class Editor extends Component {
    
    render() {
        let dialog = (
          <div style={editorStyles}>
            <button style={editorCloseButtonStyles} onClick={this.props.onClose}>x</button>
            <Canvas slideshow={defaultSlideshow} />
          </div>
        )

        if (! this.props.isOpen) {
            dialog = null;
        }

        return (
            <div>
                {dialog}
            </div>

        )
    }

}

export default Editor;