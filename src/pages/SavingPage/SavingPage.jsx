import React from 'react';
import './SavingPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Saving from '../../component/Saving/Saving';

function SavingPage({setSaving}) {
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
            <div className="saving-page-container">
                <header className="saving-page-container__header">
                    <Title> My savings </Title>
                    <Link to={'add-saving'} className="btn btn-outline-primary">Create new saving</Link>
                </header>
                
                <section className="section-border d-flex flex-column justify-content-center">
                    { accounts && accounts.length !== 0 ?
                        accounts.map( (account, i) => {
                            return  <div className="saving-page-container__saving" key={`account-saving-${i}`}>
                                        <Saving setSaving={setSaving} account={account} />
                                    </div>
                            }) :  
                        <div className="alert alert-info" role="alert">
                            You don't have any savings
                        </div>
                    }
                </section>
            </div>
    );
}

export default SavingPage;