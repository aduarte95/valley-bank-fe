import React from 'react';
import './MenuItem.scss';
import { Link } from 'react-router-dom';

function MenuItem({children, link}) {
  return (   
      <Link to={link}>
        <div className="menu-item-container d-flex flex-column justify-content-center align-items-center">
            <div className="menu-item-container__icon">
                {children[0]}
            </div>
            <div className="menu-item-container__description">
                {children[1]}
            </div>
        </div>
    </Link>
    
  );
}

export default MenuItem;