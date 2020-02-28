import React, { useState } from 'react';
import './LoginForm.scss';
import { Form } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import { useIsLoggedIn } from '../../hooks/useIsLoggedIn';
import crypto from 'crypto';
import logo from '../../assets/logo.PNG';


const authenticateUrl = `http://localhost:8080/api/v1/user/authenticate`;



const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function LoginForm() {
  const [ validated, setValidated ] = useState(false);
  const [ failedLogin, setFailedLogin ] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();
  const [rememberMe, setRememberMe] = useState(true);

  const username = localStorage.getItem('username');
  const requestBody = {
    username: username,
    password: ''
  }

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      requestBody.password = crypto.createHash("sha256")
      .update(requestBody.password)
      .digest("hex");
      console.log(requestBody.password)

      axios.post(authenticateUrl, qs.stringify(requestBody), config)
          .then(  response => {
            
            if(response.data !== 101) {
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('user', response.data.id);
              setIsLoggedIn(true);
              setFailedLogin(false);
              
              if(rememberMe) {
                localStorage.setItem('username', response.data.username);
              } else {
                localStorage.removeItem('username');
              }
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
      case 'rememberMe':
          setRememberMe(!rememberMe);
        
      break;
      default:
        break;
    }

  }

  function errorClass() {
    return(failedLogin ? 'has-error' : '');
  }
  

  return (   
    <div className="login-form-container">
      {isLoggedIn && <Redirect to="/dashboard"></Redirect>}
      <div className="form-header">
        <img className="form-header__img" src={logo} alt="logo" width={55}/> 
        <FormHeader title="Welcome back!" information="New to Valley Bank?" linkLegend="Sign Up" link="/sign-up"></FormHeader>
      </div>
      {failedLogin &&
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Your username or password is incorrect. Please try again.
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => console.log('hola')}>
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
              defaultValue={username !== undefined ? username : "" } 
              onChange={handleChange}
              className={`${errorClass()}`}/>
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
              onChange={handleChange}
              className={`${errorClass()}`} />
              <Form.Control.Feedback type="invalid">
                Please enter your password.
              </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formRemenberUsername">
              <Form.Check 
              type="checkbox"
              name="rememberMe"
              label="Remember username" 
              onChange={handleChange}
              checked={rememberMe}/>
          </Form.Group>          
          <button className="login-form-container__button login-form-container__button--icon-effect btn btn-primary " type="submit">
              Login
          </button>
      </Form>
    </div>
  );
}

export default LoginForm;