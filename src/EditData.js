import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EditData = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName(props.item.Name)
    setDescription(props.item.Description)
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    var newItem = props.item
    newItem.Name = name
    newItem.Description = description
    props.onUpdate(newItem);
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
      <Button variant="primary" type="submit" block>Submit</Button>
    </Form>
  );
};

export default EditData;

