import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

let contextMenuStyles = {
    width: '200px',
    height: '90px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '60%',
    top: '44%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#FFFFFF',
    border: '2px solid black',
    padding: '1px 2px 44px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'
}

let contextMenuCloseButtonStyles = {
    marginBottom: '1px',
    padding: '1px 2px',
    cursor: 'pointer',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    border: 'none',
    width: '20px',
    height: '20px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
}


class ContextMenu extends Component {
      
    render() {
        let dialog = (
            <div style={contextMenuStyles}>
                <Navbar>
                    <Nav className="justify-content-end" bg="light" style={{ width: "100px" }}>
                        <Nav.Link onClick={this.props.onClose} href="#">Duplicate</Nav.Link>
                    </Nav>
                </Navbar>
                <button style={contextMenuCloseButtonStyles} onClick={this.props.onClose}>x</button>
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

export default ContextMenu;