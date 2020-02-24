import React from 'react';
import './Navbar.scss';

function Navbar() {

  return (   
    <nav className="navbar-container navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">Bankito</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <a  className="navbar-container__link nav-link" href="/"><i className="fas fa-envelope"></i>  </a>
            <a  className="navbar-container__link nav-link" href="/"> <i className="fas fa-cog"></i>  </a>
            <a  className="navbar-container__link nav-link" href="/"> <i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
        </nav>
  );
}

export default Navbar;