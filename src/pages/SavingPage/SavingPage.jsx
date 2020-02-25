import React from 'react';
import './SavingPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Account from '../../component/Account/Account';
import Saving from '../../component/Saving/Saving';

function SavingPage() {
    const [ accounts, setAccounts ] = useState([]);
    const [ savings, setSavings ] = useState([]); 

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
            <div className="saving-page-container">
                <header className="saving-page-container__header d-flex justify-content-between">
                    <Title> My savings </Title>
                    <Link to={'/'} className="btn btn-outline-primary">Create new saving</Link>
                </header>
                
                <section className="d-flex flex-column justify-content-center">
                    { accounts &&
                        accounts.map( (account, i) => {
                            return  <div key={`account-saving-${i}`}>
                                        <Saving account={account} />
                                    </div>
                            })
                    }
                </section>
            </div>
    );
}

export default SavingPage;