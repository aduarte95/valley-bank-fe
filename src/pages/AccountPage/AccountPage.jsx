import React from 'react';
import './AccountPage.scss';
import Title from '../../component/shared/Title/Title';


function AccountPage() {
    return (
            <div className="account-container">
                <header className="account-container__header d-flex justify-content-between">
                    <Title> My Accounts </Title>
                    <button type="button" class="btn btn-outline-primary">Open new account</button>
                </header>

            </div>
    );
}

export default AccountPage;