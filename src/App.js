import React from 'react';
import './App.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/shared/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar></Navbar>
      <div className="app-content">
        <Switch>
          <Route path="/login" component={props => <LoginPage {...props}/>}  />
          <Route path="/" component={props => <LoginPage/>}  />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
