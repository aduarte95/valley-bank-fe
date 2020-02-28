import React from 'react';
import './Account.scss';
import { Link } from 'react-router-dom';

function Account({account}) {
  var currency = '$';
  var accountNumber = String(account.accountNumber).padStart(17, '0')

  return ( 
      <div className="account-container row">
          <div className="account-container__info col"> 
            <h3 className="account-container__title">
              {account.name}
            </h3> 
            <p className="account-container__content">
            {accountNumber}
            </p>
          </div>
          
          <div className="account-container__info col"> 
            <h3 className="account-container__title">
              Account balance
            </h3> 
            <p className="account-container__content">
              {currency}{account.balance}
            </p>
          </div>

          <div className="account-container__info col"> 
            <h3 className="account-container__title">
              Actions
            </h3> 
            <div className="account-container__content">
              <div className="d-flex ">
                <Link className="app-link action-container" to={`${account.id}/transactions`}>
                  <i className="action-icon las la-history"/> 
                  See transactions
                </Link>
              </div>
            </div>
          </div>     
    </div>
  );
}

export default Account;