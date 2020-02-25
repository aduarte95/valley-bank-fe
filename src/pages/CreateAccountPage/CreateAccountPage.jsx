import React from 'react';
import './CreateAccountPage.scss';
import Title from '../../component/shared/Title/Title';
import CreateAccountForm from '../../component/CreateAccountForm/CreateAccountForm';

function CreateAccountPage() {
  
  return ( 
    <div className="create-account-page-container">
        <header className="create-account-page-container__header d-flex justify-content-between">
            <Title> Open New Account </Title>
        </header>
        
        <section className="section-border d-flex flex-column justify-content-center">
            <CreateAccountForm></CreateAccountForm>
        </section>
    </div>
  );
}

export default CreateAccountPage;