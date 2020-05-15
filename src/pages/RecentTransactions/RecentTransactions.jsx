import React from 'react';
import './RecentTransactions.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AccountTransaction from '../../component/AccountTransaction/AccountTransaction';

function RecentTransactions({transactionsAccount}) {
    const [ account, setAccount ] = useState([]);
    const [ transactions, setTransactions ] = useState();

    useEffect(() => {
        const getAccountTransactionsUrl = `https://valley-bank-be.herokuapp.com/api/v1/account/${transactionsAccount.id}`;

        axios.get(getAccountTransactionsUrl)
          .then(  response => {
              
            setAccount(response.data);
            var transactionsArray = response.data.transactions;
                setTransactions(transactionsArray.reverse());
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [transactionsAccount]);

    return (
            <div className="recent-transaction-container">
                <section className="recent-transaction-container">
                    { transactions && 
                             transactions.map( (transaction, i) => {
                            return  <div className="recent-transaction-container__transaction" key={`account-transaction-${i}`}>
                                        <AccountTransaction transactionId={transaction.id} account={account} compareDate={true} />
                                    </div>
                            })
                    }
                </section>
            </div>
    );
}

export default RecentTransactions;