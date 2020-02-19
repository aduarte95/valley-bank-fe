import React, { useState } from 'react';
import './LoginForm.scss';
import { Form, Button } from 'react-bootstrap';

function LoginForm() {
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
    <Form className="login-form-container" noValidate validated={validated} onSubmit={handleSubmit}> 
        <Form.Group controlId="formUsername">
            <Form.Label htmlFor="inputEmail">Username</Form.Label>
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
  );
}

export default LoginForm;