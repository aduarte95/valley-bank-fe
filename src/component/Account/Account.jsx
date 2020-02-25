import React from 'react';
import './Account.scss';
import { Link } from 'react-router-dom';

function Account({account}) {
  console.log(account);
  var currency;

  if(account.currencyId === 1) {
     currency = '$';
  }
  return ( 
      <div className="account-container row">
          <div className="account-container__info col-6"> 
            <Link className="account-container__name account-container__link" to="/">
              {account.name}
            </Link> 
            <p className="account-container__content">
            {account.accountNumber}
            </p>
          </div>

          
          <div className="account-container__info col"> 
            <h3 className="account-container__title">
              Account balance
            </h3> 
            <p className="account-container__content">
              {currency + account.balance}
            </p>
          </div>

          <div className="account-container__info col"> 
            <h3 className="account-container__title">
              Acctions
            </h3> 
            <p className="account-container__content">
              <div className="d-flex ">
                <Link className="account-container__link d-flex no-wrap" to="/">
                  <i class="account-container__action-icon d-flex align-items-center las la-history"/> 
                  See transactions
                </Link>
              </div>
            </p>
          </div>     
    </div>
  );
}

export default Account;