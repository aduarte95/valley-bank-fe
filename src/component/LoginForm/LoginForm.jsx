import React, { useState } from 'react';
import './LoginForm.scss';
import { Form, Button } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';

const authenticateUrl = `http://localhost:8080/api/v1/user/authenticate`;

const requestBody = {
  username: '',
  password: ''
}

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function LoginForm() {
  const [ validated, setValidated ] = useState(false);
  const [ failedLogin, setFailedLogin ] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      axios.post(authenticateUrl, qs.stringify(requestBody), config)
          .then(  response => {
            
            if(response.data !== 101) {
              setIsLoggedIn(true);
              setFailedLogin(false);
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('user', response.data.id)
            } else {
              setFailedLogin(true);
            }  
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    
    setValidated(true);
  };

  function handleChange(event) {
    switch(event.target.name) {
      case 'username':
        requestBody.username = event.target.value;
      break;
      case 'password':
        requestBody.password = event.target.value;
      break;
      default:
        break;
    }
  }


  

  return (   
    <div className="login-form-container">
      {isLoggedIn && <Redirect to="/dashboard"></Redirect>}
      <FormHeader title="Welcome back!" information="New to Bankito?" linkLegend="Sign Up" link="/login/sign-up"></FormHeader>
      {failedLogin &&
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          Your username or password is incorrect. Please try again.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      }
      <Form  noValidate validated={validated} onSubmit={handleSubmit}> 
          <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control 
              required 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please enter your username.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              required 
              type="password" 
              name="password" 
              placeholder="Password"
              onChange={handleChange} />
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