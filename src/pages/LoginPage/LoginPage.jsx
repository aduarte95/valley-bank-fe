import React from 'react';
import './LoginPage.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from '../../component/LoginForm/LoginForm';
import SingUpForm from '../../component/SignUpForm/SignUpForm';


class LoginPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.setIsLoginPage(true)
  }

  componentWillUnmount () {
    this.props.setIsLoginPage(false)
  }

  render(){
    return (
      <div className="login-container container-fluid">
          <div className="login-container__row d-flex flex-direction-row">
              <div className="login-container__img-col">
                  <img className="login-container__img" src="https://www.cnb.bank/images/Computer.jpg" alt="Online banking"/>
              </div>
              <div className="login-container__form-col">
                <Router>
                    <Switch>
                      <Route path="/sign-up" component={props => <SingUpForm/>}  />
                      <Route path="/" component={props => <LoginForm/>}  />
                    </Switch>
                </Router>
              </div>
          </div>
      </div>
    );
  }
}

export default LoginPage;