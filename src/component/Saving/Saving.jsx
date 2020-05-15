import React from 'react';
import './Saving.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { FormErrors } from '../FormErrors/FormErrors';
import { Form } from 'react-bootstrap';
import { useSaving}  from '../../hooks/useSaving'

function Saving({account}) {
  const { savings, reload } = useSaving(account.id);
  const [ showAdd, setShowAdd ] = useState([]);
  const [addedAmount, setAddedAmount] = useState(0);
  const [ errors, setErrors ] = useState( 
    {
      formErrors: 
      {
        amount: ''
      }, 
      amountValid: false
    });

    
  useEffect(() => {
  
  }, []);


  function withdrawSaving(saving, index, isWithdraw) {
    validateField('amount', saving.id)
    
    if(errors['amountValid' + saving.id]) {
      const getAccount = `https://valley-bank-be.herokuapp.com/api/v1/account/${saving.accountModel.id}`;
      const putAccount = `https://valley-bank-be.herokuapp.com/api/v1/account`;
      const putSaving = `https://valley-bank-be.herokuapp.com/api/v1/saving`

      axios.get(getAccount)
        .then(  response => {
            var account = response.data;
            
            if(isWithdraw) {
              account.savingAmount = saving.currentBalance;
            } else {
              account.savingAmountAdded = addedAmount;
            }

            axios.put(putAccount, account)
            .then (
              response => {
                
                if(isWithdraw) {
                  saving.currentBalance = 0;
                } else {
                  saving.savingAmountAdded = addedAmount;
                }
                
                axios.put(putSaving, saving)
                .then( r => {
                  reload()
                  
                }) 
                .catch( e => console.log(e));
              }

            )
        })
        .catch(function (error) {
          console.log(error);
        });
      }
  }
  
  function handleChange(event) {
    var value = event.target.value;
    
    if(validateNumber(value)) {
      setAddedAmount(Number(value));
      
    } else {
      event.target.value = value.substring(0, value.length - 1);
    }
  }

  function validateField(fieldName, savingId) {
    let fieldValidationErrors = errors.formErrors;
    
    errors[fieldName +  "Valid" + savingId] = addedAmount <= account.balance || addedAmount === 0;
    var fieldValid = errors[fieldName +  "Valid" + savingId];
    fieldValidationErrors[fieldName + savingId] = fieldValid ? '' : "You don't have enough money on your account";
    
    setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
      [fieldName + 'Valid']: fieldValid
    }));
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
                            <p className={(saving.currentBalance === 0 ? 'red' : '') + ' saving-container__content'}>
                              ${saving.currentBalance}
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
                                onClick={() => withdrawSaving(saving, i, true)}>
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
                                  <i className="saving-container__icon las la-plus-circle"></i> 
                                  &nbsp;Add amount
                                </button>
                              {(showAdd && showAdd[saving.id]  ) && 
                              
                                <div className="saving-container__add">
                                  <Form.Group className="saving-container__input" controlId={`formSavingAmount-${saving.id}`}>
                                    <Form.Control 
                                    required 
                                    name="amount"
                                    type="text" 
                                    maxLength="7"
                                    placeholder="Add Amount" 
                                    onChange={(e) => handleChange(e)}
                                    className={`${() => errorClass(errors.formErrors['amount' + saving.id] )}`}/>
                                    <div className="panel panel-default">
                                        <FormErrors formError={errors.formErrors['amount' + saving.id]} />
                                    </div>
                                  </Form.Group>
                                  <button onClick={() => withdrawSaving(saving, i, false)} className="saving-container__button">
                                    <i className="saving-container__bnt-icon las la-plus-circle"></i>
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