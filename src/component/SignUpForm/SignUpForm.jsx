import React, { useState } from 'react';
import './SignUpForm.scss';
import { Form, Button } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';

function SignUpForm() {
const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (   
    <div className="sign-up-form-container">
      <FormHeader 
        title="Open up your Bankito account now"
        information="Already signed up?"
        linkLegend="Log in"
        link="/login"></FormHeader>
      <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
          <Form.Group controlId="formGivenName">
              <Form.Label>Name</Form.Label>
              <Form.Control required type="text" placeholder="Name" />
              <Form.Control.Feedback type="invalid">
                Please enter your name.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formFirstLastName">
              <Form.Label>First Last Name</Form.Label>
              <Form.Control required type="text" placeholder="1st Last Name" />
              <Form.Control.Feedback type="invalid">
                Please enter your first last name.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" placeholder="Username" />
              <Form.Control.Feedback type="invalid">
                Please enter your username.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" placeholder="Password" />
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRemenberUsername">
              <Form.Check type="checkbox" label="Remember username" />
          </Form.Group>

          <Button className="login-form-container__button" type="submit">
              Login
          </Button>
      </Form>
    </div>
  );
}

export default SignUpForm;