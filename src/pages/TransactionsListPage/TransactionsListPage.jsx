import React from 'react';
import './TransactionsListPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../component/Account/Account';
import AccountTransaction from '../../component/AccountTransaction/AccountTransaction';

function TransactionsListPage({match}) {
    const [ account, setAccount ] = useState([]);

    useEffect(() => {
        const getAccountTransactionsUrl = `http://localhost:8080/api/v1/account/${match.params.id}`;

        axios.get(getAccountTransactionsUrl)
          .then(  response => {
              
            setAccount(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [match.params.id]);
          
    return (
            <div className="account-page-container">
                <header className="account-page-container__header d-flex justify-content-between">
                    <Title> {account.name} Transactions </Title>
                </header>
                
                <section className="section-border d-flex flex-column justify-content-center">
                    { (account && account.transactions) &&
                        account.transactions.map( (transaction, i) => {
                            return  <div key={`account-transaction-${i}`}>
                                        <AccountTransaction transactionId={transaction.id} account={account} />
                                    </div>
                            })
                    }
                </section>
            </div>
    );
}

export default TransactionsListPage;