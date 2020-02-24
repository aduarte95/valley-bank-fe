import React from 'react';
import './MenuItem.scss';
import { NavLink } from 'react-router-dom';

function MenuItem({children, link}) {
  return (   
      <NavLink activeClassName="selected-link" to={link} exact>
        <div className="menu-item-container d-flex flex-column justify-content-center align-items-center">
            <div className="menu-item-container__icon">
                {children[0]}
            </div>
            <div className="menu-item-container__description">
                {children[1]}
            </div>
        </div>
    </NavLink>
    
  );
}

export default MenuItem;