import React from 'react';
import './LoginPage.scss';
import LoginForm from '../../component/LoginForm/LoginForm';
import Title from '../../component/shared/Title/Title';

function LoginPage() {
  
  return (
    <div className="login-container container">
        <div className="row">
            <div className="col-6 login-container__img-col">
                <img className="login-container__img" src="https://www.cnb.bank/images/Computer.jpg" alt="Online banking"/>
            </div>
            <div className="col-6">
                <Title>Welcome back!</Title>
                <LoginForm></LoginForm>
            </div>
        </div>
    </div>
  );
}

export default LoginPage;