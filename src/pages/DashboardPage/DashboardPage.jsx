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
import CreateAccountPage from '../CreateAccountPage/CreateAccountPage';
import AddFavoritePage from '../AddFavoritePage/AddFavoritePage';
import CreateSavingPage from '../CreateSavingPage/CreateSavingPage';
import TransactionsListPage from '../TransactionsListPage/TransactionsListPage';
import FavoriteAccountsPage from '../FavoriteAccountsPage/FavoriteAccountsPage';
import {useSaving} from '../../hooks/useSaving';

function DashboardPage({match}) {
    const {saving, setSaving } = useSaving();
    console.log(saving)
    return (
            <div className="dashboard-container">
                <Sidebar>
                    <div className="dashboard-container__wrapper">
                        <Navbar></Navbar>
                        <div className="container dashboard-container__pages">
                            <Route path={`${match.url}/:id/accounts`} component={props => <FavoriteAccountsPage {...props}/>}  />
                            <Route path={`${match.url}/:id/transactions`} component={props => <TransactionsListPage {...props}/>}  />
                            <Route path={`${match.url}/add-saving`} component={props => <CreateSavingPage {...props}/>}  />
                            <Route path={`${match.url}/add-favorite`} component={props => <AddFavoritePage {...props}/>}  />
                            <Route path={`${match.url}/new-account`} component={props => <CreateAccountPage {...props}/>}  />
                            <Route path={`${match.url}/savings`} component={props => <SavingPage {...props}  setSaving={setSaving}/> }/>
                            <Route path={`${match.url}/favorites`} component={props => <FavoritePage {...props}/> }/>
                            <Route path={`${match.url}/transactions`} component={props => <TransactionPage {...props}/>} />
                            <Route path={`${match.url}/accounts`} component={props => <AccountPage {...props}/>}  />
                            <Route path={`${match.url}`} component={props => <HomePage {...props} saving={saving}/>} exact />
                        </div>
                    </div>
                </Sidebar>
            </div>
    );
}

export default DashboardPage;