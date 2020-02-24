import React, { useState } from 'react';
import './SignUpForm.scss';
import { Form, Button } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'querystring';
import crypto from 'crypto';
import { FormErrors } from '../FormErrors/FormErrors';

const registerUrl = 'http://localhost:8080/api/v1/user/register';

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
const [ errors, setErrors ] = useState( 
  {
    formErrors: 
    {email: '', 
    password: '',
    username: ''}, 
    emailValid: false,
    passwordValid: false,
    usernameValid: false
  });

let addMeByCellphone = React.createRef();

  /**
   *  Handles the submit form creating a new user on the server.
   * @param {*} event 
   */
  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    event.persist();
    console.log(requestBody)
    verifyFieldsOnServer('http://localhost:8080/api/v1/user/verify-username', requestBody.username)
        .then(exists => {
          console.log(exists)
          let fieldValid =  !exists;
          errors.formErrors.username = fieldValid ? ' ' : 'is invalid';
          setErrors( oldObject => ({...oldObject, usernameValid: fieldValid}));
        
          if (form.checkValidity() === false && exists) {
            
            event.stopPropagation();
          } else {
            axios.post(registerUrl, requestBody)
                .then(  response => {
                  if(response.data === 100) {
                    setIsRegistered(true);
                  } else {
                    setIsRegistered(false);
                  }  
                })
                .catch(function (error) {
                  console.log(error);
                });
          }
          
          setValidated(true);
        });
  };

  function validateField(fieldName, value) {
    let fieldValidationErrors = errors.formErrors;
    let fieldValid = errors[fieldName +  "Valid"];
  
    switch(fieldName) {
      case 'email':
        fieldValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors[fieldName] = fieldValid ? '' : ' is invalid';
        break;
      case 'password':
        fieldValid = value.length >= 6;
        fieldValidationErrors[fieldName] = fieldValid ? '': ' is too short';
        break;
      default:
        break;
    }
    setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
                    [fieldValid]: fieldValid
                  }));
  }

  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    switch(name) {
      case 'idNumber':
        if(validateNumber(value)) {
          requestBody.idNumber = value;
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
      break;
      case 'telephone':
        if(validateNumber(value)) {
          requestBody.telephone = value;
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
      break;
      case 'cellphone':
        if(validateNumber(value)) {
          requestBody.cellphone = value;

          if(value !== "") {
            addMeByCellphone.current.disabled = false;
          } else {
            addMeByCellphone.current.disabled = true;
          }
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
      break;
      case 'canBeAddedByCellphone':
        if(value !== "") {
          requestBody.canBeAddedByCellphone = true;
        } else {
          requestBody.canBeAddedByCellphone = false;
        }
      break;
      case 'username':
        requestBody.username = value.toLowerCase();
        validateField(name, value);

        /*setTimeout(
          verifyFieldsOnServer('http://localhost:8080/api/v1/user/verify-username', { username: value }), 
          3000);
        requestBody.username = value.toLowerCase();*/
      break;
      case 'email':
        validateField(name, value);
      break;
      case 'password':
        var hash = crypto.createHash("sha256")
        .update(value)
        .digest("hex");
        requestBody.password = hash;
      break;

      default:
        requestBody[name] = value;
        break;
    }
  }

  function validateNumber(value) {
    if(!isNaN(value)) {   
      return true;
    } else {
      return false;
    }
  }

  function verifyFieldsOnServer(url, field) {
    return axios.get(url, {params: {username: field}})
          .then(  response => {
            console.log('res' + field)
            return response.data 
          })
          .catch(function (error) {
            console.log(error);
          });
  }


  return (   
    <div className="sign-up-form-container d-flex justify-content-center">
      {isRegistered && 
        <Redirect 
          to='/login'>
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
                name="givenName" 
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
                type="text" 
                maxLength="9" 
                pattern="\d{9}"
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
                 type="text" 
                 placeholder="Telephone"
                 maxLength="8" 
                 pattern="\d{8}"
                 onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your telephone.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCellphone">
                <Form.Label>Cellphone</Form.Label>
                <Form.Control
                name="cellphone"
                 type="text" 
                 placeholder="Cellphone" 
                 maxLength="8" 
                 pattern="\d{8}"
                 onChange={handleChange}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your cellphone.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCanBeAddedByCellphone">
                <Form.Check
                disabled
                name="canBeAddedByCellphone"
                 type="checkbox" 
                 ref={addMeByCellphone}
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

        <div className="panel panel-default">
          <FormErrors formErrors={errors.formErrors} />
          </div>
      </div>
    </div>
  );
}

export default SignUpForm;