import React, { useState } from 'react';
import './LoginForm.scss';
import { Form, Button } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

const url = `http://localhost:8080/api/v1/user/authenticate`;

const requestBody = {
  username: 'alexa.duarte',
  password: 'hola'
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function LoginForm() {
  const [validated, setValidated] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      axios.post(url, qs.stringify(requestBody), config)
          .then(  response => {
            if(response.data !== "101") {
              setIsLoggedIn(true);
              sessionStorage.setItem('token', response.data);
            }      
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    
    setValidated(true);
  };

  

  return (   
    <div className="login-form-container">
      {isLoggedIn && <Redirect to="/home"></Redirect>}
      <FormHeader title="Welcome back!" information="New to Bankito?" linkLegend="Sign Up" link="/sign-up"></FormHeader>
      <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
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

          <Link className="login-form-container__forgot d-flex justify-content-end" to="/" >Forgot password?</Link>
      </Form>
    </div>
  );
}

export default LoginForm;