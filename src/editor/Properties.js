import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";


const Properties = (props) => {

  const [spec, setSpec] = useState("");

  useEffect(() => {
    setSpec(JSON.stringify(props.slideshow))
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.onUpdate("updateSpec", {}, {}, spec, 0, 0)
  };


  return (
    <Form onSubmit={onSubmit}>

      <Form.Group controlId="formBasicEdit">
        <Form.Label>Specification</Form.Label>
        <Form.Control  as="textarea" rows={20}
          placeholder="Specification"
          value={spec}
          onChange={(e) => setSpec(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>Update</Button>
    </Form>
  );
}

export default Properties;
