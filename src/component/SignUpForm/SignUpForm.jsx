import React, { useState } from 'react';
import './SignUpForm.scss';
import { Form, Button } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import crypto from 'crypto';

const registerUrl = `http://localhost:8080/api/v1/user/register`;

const requestBody = {
  givenName: '',
  lastName: '',
  direction: '',
  idNumber: '',
  telephone: '',
  cellphone: '',
  canBeAddedByCellphone: false,
  email: '',
  username: '',
  password: ''
}

function SignUpForm() {
const [validated, setValidated] = useState(false);
const [ isRegistered, setIsRegistered ] = useState(false);

  function handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      console.log(requestBody)
     /* axios.post(registerUrl, qs.stringify(requestBody))
          .then(  response => {
            if(response.data === 100) {
              setIsRegistered(true);
            } else {
              setIsRegistered(false);
            }  
          })
          .catch(function (error) {
            console.log(error);
          });*/
    }
    
    setValidated(true);
  };

  function handleChange(event) {
    switch(event.target.name) {
      case 'firstName':
        requestBody.givenName = event.target.value;
      break;
      case 'lastName':
        requestBody.lastName = event.target.value;
      break;
      case 'idNumber':
        requestBody.idNumber = event.target.value;
      break;
      case 'direction':
        requestBody.direction = event.target.value;
      break;
      case 'telephone':
        requestBody.telephone = event.target.value;
      break;
      case 'cellphone':
        requestBody.cellphone = event.target.value;
      break;
      case 'canBeAddedByCellphone':
        if(event.target.value !== "") {
          requestBody.canBeAddedByCellphone = true;
        } else {
          requestBody.canBeAddedByCellphone = false;
        }
      break;
      case 'email':
        requestBody.email = event.target.value.toLowerCase();
      break;
      case 'username':
        requestBody.username = event.target.value.toLowerCase();
      break;
      case 'password':
        var hash = crypto.createHash("sha256")
        .update(event.target.value)
        .digest("hex");
        requestBody.password = hash;
      break;

      default:
        break;
    }
  }


  return (   
    <div className="sign-up-form-container d-flex justify-content-center">
      {isRegistered && 
        <Redirect 
          to={{
            pathname: '/login',
            state: { username: requestBody.username }
          }}>
          </Redirect>}
      <div className="sign-up-form-container__wrapper">
        <FormHeader 
          title="Open up your Bankito account now"
          information="Already signed up?"
          linkLegend="Log in"
          link="/login"></FormHeader>
        <Form className="sign-up-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
            <Form.Group controlId="formFirstName">
                <Form.Label>*First Name</Form.Label>
                <Form.Control 
                required 
                name="firstName" 
                type="text" 
                placeholder="First Name"
                onChange={handleChange} />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLastName">
                <Form.Label>*Last Name</Form.Label>
                <Form.Control 
                required
                name="lastName" 
                type="text" 
                placeholder="Last Name" 
                onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formIdNumber">
                <Form.Label>*Identity Number</Form.Label>
                <Form.Control 
                required 
                name="idNumber"
                type="number" 
                placeholder="Identity Number" 
                onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your identity number.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDirection">
                <Form.Label>*Direction</Form.Label>
                <Form.Control 
                required
                name="direction" 
                type="text" 
                placeholder="Direction" 
                onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your direction.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTelephone">
                <Form.Label>Telephone</Form.Label>
                <Form.Control
                name="telephone"
                 type="number" 
                 placeholder="Telephone" 
                 onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your telephone.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCellphone">
                <Form.Label>Cellphone</Form.Label>
                <Form.Control
                name="cellphone"
                 type="number" 
                 placeholder="Cellphone" 
                 onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your cellphone.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCanBeAddedByCellphone">
                <Form.Check
                name="canBeAddedByCellphone"
                 type="checkbox" 
                 label="Let me be added by cellphone number" 
                 onChange={handleChange}/>
            </Form.Group>    

            <Form.Group controlId="formEmail">
                <Form.Label>*Email</Form.Label>
                <Form.Control 
                required 
                name="email"
                type="email" 
                placeholder="Email" 
                onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formUsername">
                <Form.Label>*Username</Form.Label>
                <Form.Control 
                required 
                name="username"
                type="text" 
                placeholder="Username" 
                onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>*Password</Form.Label>
                <Form.Control 
                required 
                name="password"
                type="password" 
                placeholder="Password" 
                onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
            </Form.Group>

            <Button className="login-form-container__button" type="submit">
                Sign Up
            </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUpForm;