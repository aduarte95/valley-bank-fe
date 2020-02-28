import React from 'react';
import './Navbar.scss';

function Navbar({history}) {
  return (   
    <nav className="navbar-container navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Valley Bank</a>
        <button className="navbar-container__link nav-link" onClick={() => { sessionStorage.clear(); history.push('login')  }}> 
          <i className="las la-sign-out-alt"></i> <span className="navbar-container__logout">Logout</span>
        </button>
      </nav>
  );
}

export default Navbar;