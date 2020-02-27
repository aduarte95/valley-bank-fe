import React from 'react';
import './RecentTransactions.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AccountTransaction from '../../component/AccountTransaction/AccountTransaction';

function RecentTransactions({transactionsAccount}) {
    const [ account, setAccount ] = useState([]);
    const [ transactions, setTransactions ] = useState();

    useEffect(() => {
        const getAccountTransactionsUrl = `http://localhost:8080/api/v1/account/${transactionsAccount.id}`;

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
            <div className="account-page-container">
                <section className="d-flex flex-column justify-content-center">
                    { transactions &&
                        transactions.map( (transaction, i) => {
                            return  <div key={`account-transaction-${i}`}>
                                        <AccountTransaction transactionId={transaction.id} account={account} compareDate={true} />
                                    </div>
                            })
                    }
                </section>
            </div>
    );
}

export default RecentTransactions;