import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";


const Settings = (props) => {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(props.settings.name)
    setDescription(props.settings.description)
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.onUpdate("updateSettings", {}, {name: name, description: description}, "", 0)
  };


  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEdit">
        <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>Update</Button>
    </Form>
  );
}

export default Settings;
