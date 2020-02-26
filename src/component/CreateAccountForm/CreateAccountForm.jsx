import React, { useState } from 'react';
import './CreateAccountForm.scss';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const createTransaction = 'http://localhost:8080/api/v1/account';

const requestBody = {
    userModel: {
      id: sessionStorage.getItem('user')
    },
    balance: 0,
    accountType: 0,
    transactionLimit: 0,
    initialAmount:0,
    currencyId: 0,
    privacy: 0,
    interest: 0,
    name: 'Account'
}

function CreateAccountForm({accounts, favorites}) {
  const [validated, setValidated] = useState(false);
  const [ isSuccessful, setIsSuccessful ] = useState(false);
  const [ errors, setErrors ] = useState( 
    {
      formErrors: 
      {
        transactionLimit: ''
      }, 
      transactionLimitValid: false
    });

  function handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    
    if(form.checkValidity() === false) {   
      event.stopPropagation();
    } else {
      
      console.log(requestBody)
        axios.post(createTransaction, requestBody)
            .then(  response => {
              if(response.data === 100) {
                console.log(response.data)
                setIsSuccessful(true);
              }
            })
            .catch(function (error) {
              setIsSuccessful(false);
              console.log(error);
            });
    }
    
    setValidated(true);
  };

  function validateField(fieldName, value) {
    let fieldValidationErrors = errors.formErrors;
    let fieldValid = errors[fieldName +  "Valid"];
    
    fieldValid = value >= 1000 && value <= 7500000;

    if(fieldValid) {
      fieldValidationErrors[fieldName] = '';
    } else {
      
      if(value < 1000) {
        fieldValidationErrors[fieldName] = ' transaction limit minimum is 1000';
      } else {
        fieldValidationErrors[fieldName] = ' transaction limit maximum is 75000000 ';
      }
    }
    setErrors(oldObject => ({...oldObject, formErrors: fieldValidationErrors,
      [fieldName + 'Valid']: fieldValid
    }));
  }

  function handleChange(event) {
    var value = event.target.value;
    var name = event.target.name;

    if(name !== 'transactionLimit') {
      requestBody[name] = value;
    } else {
        if(validateNumber(value)) {
          requestBody.amount = Number(value);
          validateField(name, value);
        } else {
          event.target.value = value.substring(0, value.length - 1);
        }
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
          The account have been created successfully
          <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClose>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>) :
       
        (<div className="create-account-form-container__wrapper">
          <Form className="create-account-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
          <Form.Group controlId="formName">
              <Form.Label className="bold">Name or Description</Form.Label>
              <Form.Control 
              type="text"
              name="name"
              maxLength="30"
              placeholder="Name or Description"
              onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="newAccountcurrencySelect">
              <Form.Label className="bold">Currency</Form.Label>
              <Form.Control
                required
                as="select"
                name="currency"
                onChange={handleChange}>
                  <option className="create-account-form-container__option" value="0"> Dollares </option>
                  <option value="1"> Colones </option>
              </Form.Control>
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

            <Button className="" type="submit">
                Open Account
            </Button>
          </Form>
        </div>)
      }
    </div>
  );
}

// function errorClass(error) {
//   return(error.length === 0 ? '' : 'has-error');
// }

export default CreateAccountForm;