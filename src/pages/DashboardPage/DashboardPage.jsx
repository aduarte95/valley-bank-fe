import React from 'react';
import './DashboardPage.scss';
import { Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../component/shared/Navbar/Navbar';
import Sidebar from '../../component/shared/Sidebar/Sidebar';
import AccountPage from '../AccountPage/AccountPage';


function DashboardPage({match}) {
    return (
            <div className="dashboard-container">
                <Sidebar>
                    <div className="dashboard-container__wrapper">
                        <div className="container-fluid">
                            <Navbar></Navbar>
                            <Route path={`${match.url}/accounts`} component={props => <AccountPage {...props}/>}  />
                            <Route path={`${match.url}`} component={props => <HomePage {...props}/>} exact />
                        </div>
                    </div>
                </Sidebar>
            </div>
    );
}

export default DashboardPage;