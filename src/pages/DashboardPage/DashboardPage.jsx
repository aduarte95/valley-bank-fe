import React from 'react';
import './DashboardPage.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../component/shared/Navbar/Navbar';
import Sidebar from '../../component/shared/Sidebar/Sidebar';


function DashboardPage() {
    return (
        <Router>
            <div className="dashboard-container">
                <Sidebar>
                    <div className="dashboard-container__wrapper">
                        <Navbar></Navbar>
                        <div class="container-fluid">
                            <Switch>
                                <Route path="/home" component={props => <HomePage {...props}/>}  />
                            </Switch>
                        </div>
                    </div>
                </Sidebar>
            </div>
      </Router>
    );
}

export default DashboardPage;