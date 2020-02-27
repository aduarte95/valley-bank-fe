import React from 'react';
import './TransactionsListPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import AccountTransaction from '../../component/AccountTransaction/AccountTransaction';

function TransactionsListPage({match}) {
    const [ account, setAccount ] = useState([]);
    const [ transactions, setTransactions ] = useState();


    useEffect(() => {
        const getAccountTransactionsUrl = `http://localhost:8080/api/v1/account/${match.params.id}`;

        axios.get(getAccountTransactionsUrl)
          .then(  response => {
              
            setAccount(response.data);
            setTransactions(response.data.transactions);

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
                    { (transactions && transactions.length > 0) ?
                        (transactions.map( (transaction, i) => {
                            return  <div key={`account-transaction-${i}`}>
                                        <AccountTransaction transactionId={transaction.id} account={account} compareDate={false} />
                                    </div>
                            })) :
                            (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    The transaction have been completed successfully
                                </div>)
                    }
                </section>
            </div>
    );
}

export default TransactionsListPage;