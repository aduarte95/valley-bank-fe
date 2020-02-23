import React from 'react';
import './MenuItem.scss';

function MenuItem({children}) {

  return (   
    <div className="menu-item-container d-flex flex-column justify-content-center align-items-center">
        <div className="menu-item-container__icon">
            {children[0]}
        </div>
        <div className="menu-item-container__description">
            {children[1]}
        </div>
    </div>
    
  );
}

export default MenuItem;