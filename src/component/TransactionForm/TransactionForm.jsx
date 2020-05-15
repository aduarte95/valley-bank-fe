import React, { useState } from 'react';
import './TransactionForm.scss';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormErrors } from '../FormErrors/FormErrors';

const createTransaction = 'https://valley-bank-be.herokuapp.com/api/v1/transaction';

const requestBody = {
  accountModel: {
    id: ''
  },
  destinyAccount: {
    id: ''
  },
  amount: '',
  description: 'Other',
  amountAtTrans: ''
}

const extraInfo = {
  accountSelected: 0
}

function TransactionForm({accounts, favorites}) {
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
        if(favorites && accounts) {
          if(favorites.length !== 0 && requestBody.destinyAccount.id === '' ) {
            requestBody.destinyAccount.id = favorites[0].accountModel.id;
          }
          if(accounts.length !== 0 && requestBody.accountModel.id === '' ) {
            requestBody.accountModel.id = accounts[0].id;
            requestBody.amountAtTrans = accounts[0].balance;
          }


          console.log(requestBody)
          axios.post(createTransaction, requestBody)
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
    
    fieldValid = value <= accounts[extraInfo.accountSelected].balance;
    fieldValidationErrors[fieldName] = fieldValid ? '' : "You don't have enough money on your account";
    
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
          validateField(name, value);
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
        break;
      case 'accountModel':
        requestBody[name].id = accounts[value].id;
        extraInfo.accountSelected = value;
        requestBody.amountAtTrans = accounts[value].balance;
        break;
      case 'destinyAccount':
        requestBody[name].id = favorites[value].accountModel.id;
        break;
      default:
        
        requestBody[name] = value;
        console.log('Description',  requestBody[name])
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
          The transaction have been completed successfully
        </div>) :
       
        (<div className="transaction-form-container__wrapper">
          <Form className="transaction-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
            <Form.Group controlId="accountModelSelect">
              <Form.Label className="bold">Origin Account</Form.Label>
              <div className="transaction-form-container__accounts">
                <Form.Control
                  required
                  as="select"
                  name="accountModel"
                  onChange={handleChange}
                  className="transaction-form-container__select">
                  { accounts &&
                    accounts.map( (account, i) => {
                      return <option value={i} key={`origin-account-${i}`}> {account.name} {String(account.accountNumber).padStart(17, '0')} - ${account.balance} </option>
                    })
                  }
                </Form.Control>
                <Link to={'new-account'} className="transaction-form-container__button btn btn-outline-primary">Open new account</Link>
              </div>
            </Form.Group>

            <Form.Group controlId="destinyAccountSelect">
              <Form.Label>Destiny Account</Form.Label>
              <div className="transaction-form-container__accounts">
                <Form.Control 
                  required 
                  as="select"
                  name="destinyAccount"
                  onChange={handleChange}
                  className="transaction-form-container__select">
                  { favorites &&
                      favorites.map( (favorite, i) => {
                        return <option value={i} key={`destiny-account-${i}`}> {favorite.name} - {String(favorite.accountModel.accountNumber).padStart(17, '0')} </option>
                      })
                  }
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  You must create a favorite account to select it here.
                </Form.Control.Feedback>
                <Link to={'add-favorite'} className="transaction-form-container__button btn btn-outline-primary">Add favorite</Link>
              </div>
            </Form.Group>

            <Form.Group controlId="formAmount">
              <Form.Label className="bold">Amount</Form.Label>
              <Form.Control 
              required 
              name="amount"
              type="text" 
              maxLength="7"
              placeholder="Amount" 
              onChange={handleChange}
              className={`${errorClass(errors.formErrors.amount)}`}/>
              <Form.Control.Feedback type="invalid">
                Please enter the transaction amount.
              </Form.Control.Feedback>
              <div className="panel panel-default">
                  <FormErrors formError={errors.formErrors.amount} />
              </div>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label className="bold">Description</Form.Label>
              <Form.Control 
              type="text"
              maxLength="30"
              name="description"
              onChange={handleChange}
              placeholder="Description"/>
            </Form.Group>

            <Button className="btn-primary" type="submit">
                Make transaction
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

export default TransactionForm;