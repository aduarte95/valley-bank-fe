// From https://learnetto.com/blog/react-form-validation
import React from 'react';
import './FormErrors.scss';

export const FormErrors = ({formError}) =>
  <div className='form-errors-container'>
    <p> {formError} </p>
  </div>