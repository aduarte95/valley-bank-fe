import React from 'react';
import './Navbar.scss';
import logo from '../../../assets/logo.PNG';
import { Link } from 'react-router-dom';

function Navbar({history}) {
  return (   
    <nav className="navbar-container navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to={"/dashboard"}>
          <div className="navbar-container__brand">
            <img src={logo} alt="logo" width={55}/> 
            <span className="navbar-container__name"> Valley Bank</span>
          </div>
        </Link>
        <button className="navbar-container__link nav-link" onClick={() => { sessionStorage.clear(); history.push('/')  }}> 
          <i className="las la-sign-out-alt"></i> <span className="navbar-container__logout">Logout</span>
        </button>
      </nav>
  );
}

export default Navbar;