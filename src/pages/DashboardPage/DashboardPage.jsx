import React from 'react';
import './DashboardPage.scss';
import { Route } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import Navbar from '../../component/shared/Navbar/Navbar';
import Sidebar from '../../component/shared/Sidebar/Sidebar';
import AccountPage from '../AccountPage/AccountPage';
import FavoritePage from '../FavoritePage/FavoritePage';
import TransactionPage from '../TransactionPage/TransactionPage';
import SavingPage from '../SavingPage/SavingPage';


function DashboardPage({match}) {
    return (
            <div className="dashboard-container">
                <Sidebar>
                    <div className="dashboard-container__wrapper">
                        <Navbar></Navbar>
                        <div className="container dashboard-container__pages">
                            <Route path={`${match.url}/savings`} component={props => <SavingPage {...props}/> }/>
                            <Route path={`${match.url}/favorites`} component={props => <FavoritePage {...props}/> }/>
                            <Route path={`${match.url}/transactions`} component={props => <TransactionPage {...props}/>} />
                            <Route path={`${match.url}/accounts`} component={props => <AccountPage {...props}/>}  />
                            <Route path={`${match.url}`} component={props => <HomePage {...props}/>} exact />
                        </div>
                    </div>
                </Sidebar>
            </div>
    );
}

export default DashboardPage;