import React from 'react';
import './FormHeader.scss';
import Title from '../Title/Title';
import { Link } from 'react-router-dom';

function FormHeader({title, information, link, linkLegend}) {


  return (   
      <header className="form-header-container">
        <Title>{title}</Title>
        <p className="form-header-container__info">
          {information} <Link className="form-header-container__link" to={link}>{linkLegend}</Link>
        </p>
      </header>
  );
}

export default FormHeader;