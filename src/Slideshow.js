import React, { Component } from 'react';
import Iframe from 'react-iframe'

let slideshowStyles = {
    width: '1000px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '45%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#eee',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
}

let slideshowCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
}

class Slideshow extends Component {
    
    render() {
        let dialog = (
            <div style={slideshowStyles}>
                <button style={slideshowCloseButtonStyles} onClick={this.props.onClose}>x</button>
                <Iframe url={this.props.slideshow}
                        width="1000px"
                        height="700px"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        frameBorder="0"
                        position="relative"/>            
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

export default Slideshow;