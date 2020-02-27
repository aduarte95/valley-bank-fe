import React from 'react';
import './FavoriteAccount.scss';

function FavoriteAccount({favorite}) {
  
  return ( 
        <div className="account-container row">
            <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Acount name
              </h3> 
              <p className="account-container__content">
              {favorite.name}
              </p>
            </div>
            
            <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Account number
              </h3> 
              <p className="account-container__content">
                {String(favorite.accountModel.accountNumber).padStart(17, '0')}
              </p>
            </div>
      </div>
  );
}

export default FavoriteAccount;