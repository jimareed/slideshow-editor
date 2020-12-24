import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EditSpec = (props) => {
  const [spec, setSpec] = useState("");

  useEffect(() => {
    setSpec("")
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.onUpdate();
  };

  return (
    <Form onSubmit={onSubmit}>

      <Form.Group controlId="formBasicEdit">
        <Form.Label>Specification</Form.Label>
        <Form.Control
          placeholder="Specification"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>Submit</Button>
    </Form>
  );
};

export default EditSpec;

