import React from 'react';
import './Saving.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FormErrors } from '../FormErrors/FormErrors';
import { Form } from 'react-bootstrap';

function Saving({account}) {
  const [ savings, setSavings ] = useState([]);
  const [ showAdd, setShowAdd ] = useState([]);
  const [ errors, setErrors ] = useState( 
    {
      formErrors: 
      {
        amount: ''
      }, 
      amountValid: false
    });
  var addedAmount = 0;

  useEffect(() => {
    const getAccountUrl = `http://localhost:8080/api/v1/account/${account.id}`;
    
    axios.get(getAccountUrl)
      .then(  response => {
        setSavings(response.data.savings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [errors]);

  function withdrawSaving(saving, index) {
    const getAccount = `http://localhost:8080/api/v1/account/${saving.accountModel.id}`;
    const putAccount = `http://localhost:8080/api/v1/account`;
    const putSaving = `http://localhost:8080/api/v1/saving`

    axios.get(getAccount)
      .then(  response => {
          var account = response.data;
          account.savingAmount = saving.amount;

          axios.put(putAccount, account)
          .then (
            response => {
              saving.amount = 0;
              
              axios.put(putSaving, saving)
              .then( r => {
                var temp = savings;
                temp[index] = saving;
                setSavings(temp)
              }) 
              .catch( e => console.log(e));
            }

          )
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  
  function handleChange(event, savingId) {
    var value = event.target.value;
    var name = event.target.name;
    
    if(validateNumber(value)) {
      addedAmount = Number(value);
      validateField(name + savingId, value, savingId)
    } else {
      event.target.value = value.substring(0, value.length - 1);
    }
  }

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

  function validateField(fieldName, value, savingId) {
    let fieldValidationErrors = errors.formErrors;
    let fieldValid = errors[fieldName +  "Valid" + savingId];
    
    fieldValid = value <= account.balance || value === 0;
    fieldValidationErrors[fieldName] = fieldValid ? '' : "You don't have enough money on your account";
    
    setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
      [fieldName + 'Valid']: fieldValid
    }));

    console.log(errors)

  }

  function validateNumber(value) {
    if(!isNaN(value)) {   
      return true;
    } else {
      return false;
    }
  }

  return ( 
    <div className="saving-container">
    {savings.length !== 0 && 
      <div>
          {savings && savings.map( (saving, i) => {
            return  <div className=" saving-container__savings row" key={`saving-${saving.id.toString()}`}>
                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Name
                            </h3> 
                            <p className="saving-container__content">
                              {saving.name}
                            </p>
                          </div>
                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Balance
                            </h3> 
                            <p className="saving-container__content">
                              {saving.currentBalance}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Saving amount
                            </h3> 
                            <p className={(saving.amount === 0 ? 'red ' : '' ) + "saving-container__content"}>
                              {saving.amount}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Related account
                            </h3> 
                            <p className="saving-container__content">
                              {saving.accountModel.name} - {String(saving.accountModel.accountNumber).padStart(17, '0')}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                              Actions
                            </h3> 
                            <div className="saving-container__content">
                                <button 
                                className="saving-container__action app-link action-container" 
                                to={`${account.id}/transactions`}
                                onClick={() => withdrawSaving(saving, i)}>
                                  <i className="saving-container__icon action-icon las la-redo-alt"></i>
                                  &nbsp;Withdraw savings
                                </button>
                                <button 
                                className="saving-container__action app-link action-container" 
                                to={`${account.id}/transactions`}
                                onClick={() => {
                                 if(showAdd[saving.id]) {
                                  setShowAdd(oldObject => ({...oldObject, [saving.id]: !showAdd[saving.id]}))  
                                 } else {
                                  setShowAdd(oldObject => ({...oldObject, [saving.id]: true}))  
                                 }
                                }}>
                                  <i className="las la-plus-circle"></i> 
                                  &nbsp;Add amount
                                </button>
                              {(showAdd && showAdd[saving.id]  ) && 
                              
                                <div className="saving-container__add">
                                  <Form.Group className="saving-container__input" controlId={`formSavingAmount-${saving.id}`}>
                                    <Form.Control 
                                    required 
                                    name="amount"
                                    type="text" 
                                    maxLength="6"
                                    placeholder="Add Amount" 
                                    onChange={(e) => handleChange(e, saving.id)}
                                    className={`${errorClass(errors.formErrors['amount' + saving.id] )}`}/>
                                    <div className="panel panel-default">
                                        <FormErrors formError={errors.formErrors['amount' + saving.id]} />
                                    </div>
                                  </Form.Group>
                                  <button className="saving-container__button">
                                    <i className="las la-plus-circle"></i>
                                  </button>
                                </div>
                              }
                            </div>
                          </div>  
                      </div>
                      
          })}
          </div>      
        } 
        </div>
  )
}

function errorClass(error) {
  if(error) {
  return(error.length === 0 ? '' : 'has-error');
  }
}

export default Saving;