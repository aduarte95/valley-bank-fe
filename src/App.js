import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './component/shared/Navbar/Navbar';
import './App.scss';
import { useIsLoginPage } from './hooks/useIsLoginPage';

function App() {
  const { isLoginPage, setIsLoginPage } = useIsLoginPage();

  return (
    <Router>
      {!isLoginPage && <Navbar></Navbar>}
      <div className="app-content">
        <Switch>
          <Route path="/home" component={props => <Navbar {...props}/>}  />
          <Route path="/" component={props => <LoginPage setIsLoginPage={setIsLoginPage}/>}  />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
