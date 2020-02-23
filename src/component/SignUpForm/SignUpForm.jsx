import React, { useState } from 'react';
import './SignUpForm.scss';
import { Form, Button } from 'react-bootstrap';
import FormHeader from '../shared/FormHeader/FormHeader';

function SignUpForm() {
const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (   
    <div className="sign-up-form-container d-flex justify-content-center">
      <div className="sign-up-form-container__wrapper">
        <FormHeader 
          title="Open up your Bankito account now"
          information="Already signed up?"
          linkLegend="Log in"
          link="/login"></FormHeader>
        <Form className="sign-up-form-container__form" noValidate validated={validated} onSubmit={handleSubmit}> 
            <Form.Group controlId="formFirstName">
                <Form.Label>*First Name</Form.Label>
                <Form.Control required type="text" placeholder="First Name" />
                <Form.Control.Feedback type="invalid">
                  Please enter your first name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formLastName">
                <Form.Label>*Last Name</Form.Label>
                <Form.Control required type="text" placeholder="Last Name" />
                <Form.Control.Feedback type="invalid">
                  Please enter your last name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formIdNumber">
                <Form.Label>*Identity Number</Form.Label>
                <Form.Control required type="text" placeholder="Identity Number" />
                <Form.Control.Feedback type="invalid">
                  Please enter your identity number.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDirection">
                <Form.Label>*Direction</Form.Label>
                <Form.Control required type="text" placeholder="Direction" />
                <Form.Control.Feedback type="invalid">
                  Please enter your direction.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formTelephone">
                <Form.Label>Telephone</Form.Label>
                <Form.Control required type="number" placeholder="Telephone" />
                <Form.Control.Feedback type="invalid">
                  Please enter your telephone.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCellphone">
                <Form.Label>Cellphone</Form.Label>
                <Form.Control required type="number" placeholder="Cellphone" />
                <Form.Control.Feedback type="invalid">
                  Please enter your cellphone.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCanBeAddedByCellphone">
                <Form.Check type="checkbox" label="Let me be added by cellphone number" />
            </Form.Group>    

            <Form.Group controlId="formEmail">
                <Form.Label>*Email</Form.Label>
                <Form.Control required type="email" placeholder="Email" />
                <Form.Control.Feedback type="invalid">
                  Please enter your email.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formUsername">
                <Form.Label>*Username</Form.Label>
                <Form.Control required type="text" placeholder="Username" />
                <Form.Control.Feedback type="invalid">
                  Please enter your username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>*Password</Form.Label>
                <Form.Control required type="password" placeholder="Password" />
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