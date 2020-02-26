import React, { useState } from 'react';
import './TransactionForm.scss';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const createTransaction = 'http://localhost:8080/api/v1/transaction';

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

function TransactionForm({accounts, favorites}) {
  const [validated, setValidated] = useState(false);
  const [ isSuccessful, setIsSuccessful ] = useState(false);

  /**
   *  Handles the submit form creating a new user on the server.
   * @param {*} event 
   */
  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    
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
    
    setValidated(true);
  };

  /*function clearForm(form) {
    var formElements = form.elements;
    var fieldType;

    for(var i=0; i<formElements.length; i++) {
      fieldType = formElements[i].type.toLowerCase();

      switch (fieldType)
      {
      
      case "select-one":
          formElements[i].selectedIndex = -1;
          break;
      default:
          formElements[i].value = "";
          break;
      }
  
    }

  }*/

  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    switch (name) {
      case 'amount':
        if(validateNumber(value)) {
          requestBody.amount = Number(value);
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
        break;
      case 'accountModel':
        requestBody[name].id = accounts[value].id;
        requestBody.amountAtTrans = accounts[value].balance;
        break;
      default:
        
        requestBody[name].id = favorites[value].accountModel.id;
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
        (<div class="alert alert-success alert-dismissible fade show" role="alert">
          The transaction have been completed successfully
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClose>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>) :
       
        (<div className="transaction-form-container__wrapper">
          <Form className="transaction-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
            <Form.Group controlId="accountModelSelect">
              <Form.Label className="bold">Origin Account</Form.Label>
              <div className="d-flex">
                <Form.Control
                  required
                  as="select"
                  name="accountModel"
                  onChange={handleChange}
                  className="transaction-form-container__select">
                  { accounts &&
                    accounts.map( (account, i) => {
                      return <option value={i} key={`origin-account-${i}`}> {account.name} </option>
                    })
                  }
                </Form.Control>
                <Link to={'new-account'} className="transaction-form-container__button btn btn-outline-primary">Open new account</Link>
              </div>
            </Form.Group>

            <Form.Group controlId="destinyAccountSelect">
              <Form.Label>Destiny Account</Form.Label>
              <div className="d-flex">
                <Form.Control 
                  required 
                  as="select"
                  name="destinyAccount"
                  onChange={handleChange}
                  className="transaction-form-container__select">
                  { favorites &&
                      favorites.map( (favorite, i) => {
                        return <option value={i} key={`destiny-account-${i}`}> {favorite.name} </option>
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
              onChange={handleChange}/>
              <Form.Control.Feedback type="invalid">
                Please enter the transaction amount.
              </Form.Control.Feedback>
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

export default TransactionForm;