import React from 'react';
import './Card.scss';
import { Link } from 'react-router-dom';

function Card({account}) {
  console.log(account);
  var currency;

  if(account.currencyId === 1) {
     currency = '$';
  }
  return ( 
    <div className="accordion" id="accordion"> 
      <div className="account-card-container card ">
        <Link to="/" className="account-card-container__body">
          <div className="card-body">
            <h2 className="account-card-container__name card-title"> {account.name} </h2>
            <h3 className="account-card-container__number">Account # {account.accountNumber}</h3>
            
            <p className="account-card-container__balance">
              <span className="account-card-container__currency"> {currency}</span>{account.balance} 
            </p>
          </div>
        </Link>

        <div className="account-card-container__footer card-footer d-flex justify-content-end" id="headingOne">
          <button className="account-card-container__chevron btn btn-link collapsed" type="button" data-toggle="collapse" data-target={"#collapse" + account.id} aria-expanded="true" aria-controls="collapseOne">
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>

        <div id={"collapse" + account.id} className="account-card-container__collapse collapse" aria-labelledby="headingOne" data-parent="#accordion">
          <div className="account-card-container__option card-body">
            <Link to={`/dashboard/transactions/${account.id}`}> Make transaction </Link>
          </div>
          <div className="account-card-container__option card-body">
            <Link to="/"> See transactions </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;