import React from 'react';
import './DashboardPage.scss';
import { Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../component/shared/Navbar/Navbar';
import Sidebar from '../../component/shared/Sidebar/Sidebar';
import AccountPage from '../AccountPage/AccountPage';
import Transaction from '../TransactionPage/TransactionPage';


function DashboardPage({match}) {
    return (
            <div className="dashboard-container">
                <Sidebar>
                    <div className="dashboard-container__wrapper">
                        <Navbar></Navbar>
                        <div className="container dashboard-container__pages">
                            <Route path={`${match.url}/transactions`} component={props => <Transaction {...props}/>}  />
                            <Route path={`${match.url}/accounts`} component={props => <AccountPage {...props}/>}  />
                            <Route path={`${match.url}`} component={props => <HomePage {...props}/>} exact />
                        </div>
                    </div>
                </Sidebar>
            </div>
    );
}

export default DashboardPage;