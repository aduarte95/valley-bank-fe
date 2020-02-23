import React from 'react';
import './LoginPage.scss';
import { Switch, Route } from 'react-router-dom';
import LoginForm from '../../component/LoginForm/LoginForm';
import SingUpForm from '../../component/SignUpForm/SignUpForm';


function LoginPage({match}) {

    return (
      <div className="login-container container-fluid">
          <div className="login-container__row d-flex flex-direction-row">
              <div className="login-container__img-col">
                  <img className="login-container__img" src="https://www.cnb.bank/images/Computer.jpg" alt="Online banking"/>
              </div>
              <div className="login-container__form-col d-flex align-items-center">
                <Switch>
                    <Route path={`${match.url}/sign-up`} component={props => <SingUpForm/>}  />
                    <Route path={`${match.url}`} component={props => <LoginForm/>} exact />
                </Switch>
              </div>
          </div>
      </div>
    );
}

export default LoginPage;