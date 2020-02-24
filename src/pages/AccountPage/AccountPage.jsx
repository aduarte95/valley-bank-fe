import React from 'react';
import './AccountPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Card from '../../component/shared/Card/Card';

function AccountPage() {
    const [ accounts, setAccounts ] = useState([]);

    useEffect(() => {
        var userId = sessionStorage.getItem('user');
        const getAccountsUrl = `http://localhost:8080/api/v1/user/${userId}`;

        axios.get(getAccountsUrl)
          .then(  response => {
              
            setAccounts(response.data.accounts);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, []);
          
    return (
            <div className="account-container">
                <header className="account-container__header d-flex justify-content-between">
                    <Title> My Accounts </Title>
                    <button type="button" className="btn btn-outline-primary">Open new account</button>
                </header>
                
                
                    <section className="account-container__account-card d-flex">
                        { accounts &&
                            accounts.map( (account, i) => {
                                return  <div key={`account-card-${i}`}>
                                            <Card account={account} />
                                        </div>
                                })
                        }
                    </section>

            </div>
    );
}

export default AccountPage;