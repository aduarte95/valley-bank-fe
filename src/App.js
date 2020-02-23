import React from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import './App.scss';
import DashboardPage from './pages/DashboardPage/DashboardPage';

function App() {

  return (
    <Router>
      <div className="app-content">
        <Switch>
          <Route path="/dashboard" component={props => <DashboardPage {...props}/>}  />
          <Route path="/login" component={props => <LoginPage {...props}/>}  />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
