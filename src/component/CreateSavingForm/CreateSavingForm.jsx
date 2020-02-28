import React, { useState } from 'react';
import './CreateSavingForm.scss';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { FormErrors } from '../FormErrors/FormErrors';
import { Redirect } from 'react-router-dom';


const createSaving = 'http://localhost:8080/api/v1/saving';

const requestBody = {
    accountModel: {
      id: '',
      savingAmount: 0
    },
    name: 'Saving',
    amount: 0,
    currentBalance: 0,
}

const extraInfo = {
  accountSelected: 0
}

function CreateSavingForm({accounts}) {
  const [validated, setValidated] = useState(false);
  const [ isSuccessful, setIsSuccessful ] = useState(false);
  const [ errors, setErrors ] = useState( 
    {
      formErrors: 
      {
        amount: ''
      }, 
      amountValid: false
    });
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
        if(accounts) {
          if(accounts.length !== 0 && requestBody.accountModel.id === '' ) {
            requestBody.accountModel.id = accounts[0].id;
          }

          axios.post(createSaving, requestBody)
              .then(  response => {
                if(response.data === 100) {
                  setIsSuccessful(true);
                }
              })
              .catch(function (error) {
                setIsSuccessful(false);
                console.log(error);
              });
            }
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
    
    fieldValid = value >= 1000 && value <= accounts[extraInfo.accountSelected].balance;

    if(fieldValid) {
      fieldValidationErrors[fieldName] = '';
    } else {
      
      if(value < 1000) {
        fieldValidationErrors[fieldName] = 'Saving minimum amount is 1000';
      } else {
        fieldValidationErrors[fieldName] = "You don't have enough money on your account";
      }
    }
    setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
      [fieldName + 'Valid']: fieldValid
    }));

  }

  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    switch (name) {
      case 'amount':
        if(validateNumber(value)) {
          requestBody.amount = Number(value);
          requestBody.currentBalance = Number(value);
          validateField(name, value)
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
        break;
      case 'accountModel':
        requestBody[name].id = accounts[value].id;
        extraInfo.accountSelected = value;
        requestBody.amountAtTrans = accounts[value].balance;
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

  return (   
    <div>
      {isSuccessful ?
        (<div className="alert alert-success alert-dismissible fade show" role="alert">
          The account have been created successfully
          <button type="button" className="close" data-dismiss="alert" aria-label="Close" 
          onClose={(()=> {
            return <Redirect to="/dashboard/accounts"></Redirect>
          })}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>) :
       
        (<div className="create-account-form-container__wrapper">
          <Form className="create-account-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
          
            <Form.Group controlId="formSavingName">
                <Form.Label>Name or Description</Form.Label>
                <Form.Control 
                type="text"
                name="name"
                maxLength="30"
                placeholder="Name or Description"
                onChange={handleChange}/>
              </Form.Group>
              
            <Form.Group controlId="accountModelSelect">
                <Form.Label>Account</Form.Label>
                <Form.Control
                  required
                  as="select"
                  name="accountModel"
                  onChange={handleChange}>
                  { accounts &&
                    accounts.map( (account, i) => {
                      return <option value={i} key={`saving-account-${i}`}> {String(account.accountNumber).padStart(17, '0')} {account.name} - ${account.balance} </option>
                    })
                  }
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAmount">
                <Form.Label>Saving Amount</Form.Label>
                <Form.Control 
                required 
                name="amount"
                type="text" 
                maxLength="6"
                placeholder="Amount" 
                onChange={handleChange}
                className={`${errorClass(errors.formErrors.amount)}`}/>
                <Form.Control.Feedback type="invalid">
                  Please enter the saving amount per month.
                </Form.Control.Feedback>
                <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.amount} />
                </div>
              </Form.Group>


            {/* <Form.Group controlId="formTransactionLimit">
              <Form.Label>Transaction Limit</Form.Label>
              <Form.Control 
              required 
              defaultValue="40000"
              name="transactionLimit"
              type="text" 
              maxLength="6"
              placeholder="TransactionLimit" 
              onChange={handleChange}
              className={`${errorClass(errors.formErrors.transactionLimit)}`}/>
              <div className="panel panel-default">
                <FormErrors formError={errors.formErrors.transactionLimit} />
              </div>
              <Form.Control.Feedback type="invalid">
                Please enter the transaction limit from this account.
              </Form.Control.Feedback>
            </Form.Group> */}

            <Button className="btn-primary" type="submit">
                Create Saving
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

export default CreateSavingForm;