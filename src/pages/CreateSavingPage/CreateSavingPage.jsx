import React, { useState, useEffect } from 'react';
import './CreateSavingPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import CreateSavingForm from '../../component/CreateSavingForm/CreateSavingForm';

function CreateSavingPage() {
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
    <div className="create-account-page-container">
        <header className="create-account-page-container__header d-flex justify-content-between">
            <Title> Add new saving </Title>
        </header>
        
        <section className="section-border d-flex flex-column justify-content-center">
            <CreateSavingForm accounts={accounts}></CreateSavingForm>
        </section>
    </div>
  );
}

export default CreateSavingPage;