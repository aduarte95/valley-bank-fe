import React, {useEffect, useState} from 'react';
import './AccountTransaction.scss';
import axios from 'axios';
import dayjs from 'dayjs';

function AccountTransaction({transactionId, account, compareDate}) {
  const [ transaction, setTransaction ] = useState();
  var currency;

  if(account.currencyId === 0) {
    currency = '₡';
  } else {
    currency = '$'
  }

    useEffect(() => {
        const getTransaction = `http://localhost:8080/api/v1/transaction/${transactionId}`;

        axios.get(getTransaction)
          .then(  response => {
              if(compareDate) {
                const now = new Date(); 
                now.setDate(now.getDate()-3);

                const comparingDate = dayjs(now).format('DD-MM-YYYY');
                const currentDate = dayjs(response.data.date).format('DD-MM-YYYY');

                console.log(response.data.date + ' ' + currentDate + ' ' + comparingDate)
                if(currentDate >= comparingDate) {
                  setTransaction(response.data);
                }
                 
              } else {
                setTransaction(response.data);
              }
              
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [transactionId, compareDate]);

  return ( 
    <div>
      {transaction &&
        <div className="account-container row">
            <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Date
              </h3> 
              <p className="account-container__content">
              {dayjs(transaction.date).format('MMMM D, YYYY')}
              </p>
            </div>
            
            <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Origin Account
              </h3> 
              <p className="account-container__content">
                {account.name} - {String(account.accountNumber).padStart(17, '0')}
              </p>
            </div>

            <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Destiny Account
              </h3> 
              <p className="account-container__content">
                {transaction.destinyAccount && String(transaction.destinyAccount.accountNumber).padStart(17, '0')}
              </p>
            </div>

            <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Amount
              </h3> 
              <p className="account-container__content">
                {currency}{transaction.amount}
              </p>
            </div>

            {/* <div className="account-container__info col"> 
              <h3 className="account-container__title">
                Amount at transfer
              </h3> 
              <p className="account-container__content">
                {transaction.amountAtTrans}
              </p>
            </div>    */}
      </div>
      }
    </div>
  );
}

export default AccountTransaction;