import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Navbar from './component/shared/Navbar/Navbar';
import './App.scss';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {

  return (
    <Router>
      <div className="app-content">
        <Switch>
          <Route path="/home" component={props => <DashboardPage {...props}/>}  />
          <Route path="/" component={props => <LoginPage/>}  />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
