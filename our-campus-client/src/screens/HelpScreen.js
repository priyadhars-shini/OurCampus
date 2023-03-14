import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { Link } from "react-router-dom";

const HelpScreen = () => {
  const [help, setHelp] = useState("");

  // const submitHandler = () =>{
  //   console.log()
  // }

  return (
    <Container>
      <Message variant='info'>Welcome To Help Center</Message>
      <FormContainer>
        <h1>Make your Queries Here</h1>
        <Form >
          <Form.Group controlId='Help'>
            <Form.Label>Help</Form.Label>
            <Form.Control
              type='Help'
              placeholder='Enter the Help Required'
              value={help}
              onChange={(e) => setHelp(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br />
          <Link to="/">
          <Button type='submit' variant='primary'>
            Submit
          </Button>
          </Link>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default HelpScreen;
