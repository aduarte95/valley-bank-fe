import React, { useState, useEffect } from 'react';
import './AddFavoriteForm.scss';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FormErrors } from '../FormErrors/FormErrors';

const createFavorite = 'http://localhost:8080/api/v1/favorite';

const requestBody = {
    userModel: {
      id: sessionStorage.getItem('user')
    },
    accountModel: {
      id: '',
      accountNumber: '',
      cellphone: ''
    },
    usingToken: false,
    name: 'Favorite'
}

function AddFavoriteForm({favorites}) {
  const [validated, setValidated] = useState(false);
  const [ isSuccessful, setIsSuccessful ] = useState(false);
  const [ addedYet, setAddYet ] = useState(false);
  const [ errors, setErrors ] = useState( 
    {
      formErrors: 
      {
        accountNumber: ''
      }, 
      accountNumberValid: false
    });

    useEffect(() => {
      
    }, [errors]);
  /**
   *  Handles the submit form creating a new use
   * r on the server.
   * @param {*} event 
   */
  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();

    console.log(requestBody.accountModel.accountNumber)
    if(requestBody.accountModel.accountNumber !== '') {
      verifyFieldsOnServer('http://localhost:8080/api/v1/account/get-account-by-number', {accountNumber: requestBody.accountModel.accountNumber})
            .then(account => {
              
              validateField('accountNumber', account);

              if (allValidated() === false) {
                event.stopPropagation();
              } else {
                if(form.checkValidity() === false) {   
                  event.stopPropagation();
                } else {
                    axios.post(createFavorite, requestBody)
                        .then(  response => {
                          if(response.data === 100) {
                            setIsSuccessful(true);
                            setAddYet(false);
                          }
                        })
                        .catch(function (error) {
                          setIsSuccessful(false);
                          console.log(error);
                        });
                }
              }

            });
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
      case 'accountNumber':
        if(value) {    
          console.log('val',value)
          if(favorites.some( fav => fav.id === value.id )) {
            fieldValid = true;
            fieldValidationErrors[fieldName] = '';
            requestBody.accountModel.id = value.id;
          } else {
            fieldValid = false;
            fieldValidationErrors[fieldName] = " ";
            setAddYet(true);
          }
        } else {
          fieldValid = false;
          fieldValidationErrors[fieldName] = fieldName + " account number doesn't exists";
        }
        setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
          [fieldName + 'Valid']: fieldValid
        }));
      break;

      default:
        break;
    }
  }

  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    switch (name) {
      case 'accountNumber':
          if(validateNumber(value)) {
            requestBody.accountModel.accountNumber = Number(value);
          } else {
            event.target.value = value.substring(0, value.length - 1);
          }
        break;
      case 'cellphone':
        //TODO
        break;
    
      default:
        requestBody[name] = value;
        break;
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

  function validateNumber(value) {
    if(!isNaN(value)) {   
      return true;
    } else {
      return false;
    }
  }

  return (   
    <div>
      {addedYet && 
        <div className="alert alert-error alert-dismissible fade show" role="alert">
          The favorite account have been added yet
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClose>
            <span aria-hidden="true">&times;</span>
          </button>
        </div> }

      {isSuccessful ?
        (<div className="alert alert-success alert-dismissible fade show" role="alert">
          The favorite account have been added successfully
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClose>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>) :
       
        (<div className="create-account-form-container__wrapper">
          <Form className="create-account-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
          <Form.Group controlId="formFavoriteName">
              <Form.Label>Name or Description</Form.Label>
              <Form.Control 
              type="text"
              name="name"
              maxLength="30"
              placeholder="Name or Description"
              onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formFavoriteAccountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control 
              required 
              name="accountNumber"
              type="text" 
              maxLength="6"
              placeholder="Account Number" 
              onChange={handleChange}
              className={`${errorClass(errors.formErrors.accountNumber)}`}/>
              <div className="panel panel-default">
                <FormErrors formError={errors.formErrors.accountNumber} />
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter the favorite number account.
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group controlId="formFavoriteCellphone">
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
                  The cellphone doesn't exist
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.cellphone} />
                </div>
            </Form.Group> */}

            <Button className="login-form-container__button" type="submit">
                Add Favorite
            </Button>
          </Form>
        </div>)
      }
    </div>
  );
}

function errorClass(error) {
  return(error.length === 0 ? '' : 'has-error');
}

export default AddFavoriteForm;