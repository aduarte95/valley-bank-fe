import React, { useState, Fragment } from 'react';
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
  cellphone: null,
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
    username: '',
    idNumber: '',
    cellphone: ''}, 
    emailValid: false,
    passwordValid: false,
    usernameValid: false,
    idNumberValid: false,
    cellphoneValid: false
  });

let addMeByCellphone = React.createRef();

  /**
   *  Handles the submit form creating a new user on the server.
   * @param {*} event 
   */
  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();

    if (allValidated() === false) {
      event.stopPropagation();
    } else {
      if(form.checkValidity() === false) {   
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
    }
    
    setValidated(true);
  };

  function allValidated(){
    var allAreValidated = true;

    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        if(errors[key] !== 'formErrors') {
          if(errors[key] === false) {
            allAreValidated = false;
            break;
          }
          
        }
      }
    }

    return allAreValidated;
  }

  function validateField(fieldName, value) {
    let fieldValidationErrors = errors.formErrors;
    let fieldValid = errors[fieldName +  "Valid"];
  
    switch(fieldName) {
      case 'password':
        fieldValid = checkPassword(value);
        fieldValidationErrors[fieldName] = fieldValid ? '': 
        (<Fragment>
          <span> {fieldName} invalid. It must contain: <br/>
            <ul>
              <li>Six or more characters long</li>
              <li>At least one digit</li>
              <li>At least one lowercase character </li>
              <li>At least one uppercase character </li>
            </ul>
          </span>
        </Fragment>)
        setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
          [fieldName + 'Valid']: fieldValid
        }));
        break;

      case 'username': 
        verifyFieldsOnServer('http://localhost:8080/api/v1/user/verify-username', {username: value})
          .then(exists => {
            fieldValid = !exists;
            fieldValidationErrors[fieldName] = fieldValid ? '' : fieldName + ' already exists';
            setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
              [fieldName + 'Valid']: fieldValid
            }));
          });
        break;
      
      case 'idNumber':
        verifyFieldsOnServer('http://localhost:8080/api/v1/user/verify-id-number', {idNumber: value})
          .then(exists => {
            fieldValid = !exists;
            fieldValidationErrors[fieldName] = fieldValid ? '' : 'Identification number already exists';
            setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
              [fieldName + 'Valid']: fieldValid
            }));
          });
      break;

      case 'email':
        verifyFieldsOnServer('http://localhost:8080/api/v1/user/verify-email', {email: value})
          .then(exists => {
            fieldValid = !exists;
            fieldValidationErrors[fieldName] = fieldValid ? '' : fieldName + ' already exists';
            setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
              [fieldName + 'Valid']: fieldValid
            }));
          });
      break;

      case 'cellphone':
        verifyFieldsOnServer('http://localhost:8080/api/v1/user/verify-cellphone', {cellphone: value})
          .then(exists => {
            fieldValid = !exists;
            fieldValidationErrors[fieldName] = fieldValid ? '' : fieldName + ' already exists';
            setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
              [fieldName + 'Valid']: fieldValid
            }));
          });
      break;

      default:
        break;
    }
  }

  function checkPassword(str)
  {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(str);
  }

  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    switch(name) {
      case 'idNumber':
        if(validateNumber(value)) {
          requestBody.idNumber = value;
          validateField(name, value);
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

          if(value !== "" && validateField(name, value)) {
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
        requestBody[name] = value.toLowerCase();
        validateField(name, value);
      break;
      case 'password':
        if(validateField(name, value)) {
          var hash = crypto.createHash("sha256")
          .update(value)
          .digest("hex");

          requestBody[name] = hash;
        }
      case 'email': 
        requestBody[name] = value.toLowerCase();
        validateField(name, value);
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
    return axios.get(url, {params: field})
          .then(  response => {
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
                onChange={handleChange}
                className={`${errorClass(errors.formErrors.idNumber)}`}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your identity number.
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.idNumber} />
                </div>
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
                 onChange={handleChange}
                 className={`${errorClass(errors.formErrors.cellphone)}`}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your cellphone.
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.cellphone} />
                </div>
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
                onChange={handleChange}
                className={`${errorClass(errors.formErrors.email)}`}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.email} />
                </div>
            </Form.Group>

            <Form.Group controlId="formUsername">
                <Form.Label>*Username</Form.Label>
                <Form.Control 
                required 
                name="username"
                type="text" 
                placeholder="Username" 
                onChange={handleChange}
                className={`${errorClass(errors.formErrors.username)}`} />
                <Form.Control.Feedback type="invalid">
                  Please enter your username.
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.username} />
                </div>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>*Password</Form.Label>
                <Form.Control 
                required 
                name="password"
                type="password" 
                placeholder="Password" 
                onChange={handleChange}
                className={`${errorClass(errors.formErrors.password)}`}/>
                <Form.Control.Feedback type="invalid">
                  Please enter your password.
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.password} />
                </div>
            </Form.Group>

            <Button className="login-form-container__button" type="submit">
                Sign Up
            </Button>
        </Form>

        
      </div>
    </div>
  );
}

function errorClass(error) {
  return(error.length === 0 ? '' : 'has-error');
}

export default SignUpForm;