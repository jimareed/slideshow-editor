import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth0 } from "./react-auth0-spa";

const SLIDESHOW_URI = process.env.REACT_APP_SLIDESHOW_URI || "" 

const EditSpec = (props) => {
  const [spec, setSpec] = useState("");

  const {
    getTokenSilently,
  } = useAuth0();

  useEffect(() => {
    setSpec("")
    getData()
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    updateData()
    props.onUpdate();
  };

  const getData = async () => {
    try {
      const token = await getTokenSilently();
      // Send a GET request to the server and add the signed in user's
      // access token in the Authorization header
      const response = await fetch(SLIDESHOW_URI + "/specs/" + props.item.ResourceId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = await response.json();

      setSpec(responseData.specification);
    } catch (error) {
      console.error(error);
    }
  };

  const updateData = async () => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(SLIDESHOW_URI + `/specs/` + props.item.ResourceId,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: "1", specification: spec }),
        }
      );
      // Since this is just for demonstration and we're not actually
      // persisting this data, we'll just set the product vote status here
      // if the product exists
      if (response.ok) {
      } else console.log(response.status);
    } catch (error) {
      console.error(error);
    }
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

