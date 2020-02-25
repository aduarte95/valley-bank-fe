import React from 'react';
import './AccountPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../component/Account/Account';

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
            <div className="account-page-container">
                <header className="account-page-container__header d-flex justify-content-between">
                    <Title> My Accounts </Title>
                    <Link to={'new-account'} className="btn btn-outline-primary">Open new account</Link>
                </header>
                
                <section className="section-border d-flex flex-column justify-content-center">
                    { accounts &&
                        accounts.map( (account, i) => {
                            return  <div key={`account-${i}`}>
                                        <Account account={account} />
                                    </div>
                            })
                    }
                </section>
            </div>
    );
}

export default AccountPage;