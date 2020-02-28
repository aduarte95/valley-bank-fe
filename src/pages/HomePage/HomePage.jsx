import React , {useState, useEffect} from 'react';
import './HomePage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import RecentTransactions from '../RecentTransactions/RecentTransactions';
import Chart from '../../component/Chart/Chart';
import {useSaving } from '../../hooks/useSaving';


function HomePage() {
    const [ user, setUser] = useState([]);
    const { savings, getSavings } = useSaving();
    const [ balance, setBalance] = useState();
    const [ savingsBalance, setSavingsBalance] = useState(0);
    const [ accounts, setAccounts] = useState([]);

    useEffect(() => {
        var userId = sessionStorage.getItem('user');
        const getUserUrl = `http://localhost:8080/api/v1/user/${userId}`;
    
        axios.get(getUserUrl)
            .then(  response => {
                setUser(response.data);
                var newBalance = 0;
                setAccounts(response.data.accounts);

                response.data.accounts.forEach( account => {
                    newBalance += account.balance;
                })

                setBalance(newBalance);

                getAccountSavings(response.data.accounts);
            })
            .catch(function (error) {
            console.log(error);
            });
        }, []);

        function getAccountSavings(accounts) {
            var savingCont = savingsBalance;
            
            if(accounts) {
                accounts.forEach( account => {
                    if(account.id) {
                        axios.get(`http://localhost:8080/api/v1/account/${account.id}`)
                          .then(  response => {
                            
                            if(response.data.savings) {
                                
                                response.data.savings.forEach( saving => {    
                                    savingCont += saving.currentBalance});
                                    setSavingsBalance(savingCont);
                            }
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      }
                })
            }
            
        }
    
    return ( 
        <div className="home-page-container">
            <header className="favorite-page-container__header d-flex justify-content-between">
                <Title> Welcome back, {user.givenName}! </Title>
            </header>

            <div className="section-border home-page-container__balance">
                <Title className="homa-page-container__title" > Your balance </Title>
                <p className="home-page-container__balance-number" > {balance} </p>
            </div>

            <Title> Recent Transactions </Title>
            <div className="home-page-container__info">
                <section className="home-page-container__list section-border">
                        { accounts &&
                        accounts.map( account => {
                            return  <div key={`recent-transaction-${account.id}`}>
                                        <RecentTransactions transactionsAccount={account} />
                                    </div>
                        })}
                </section>
                <Chart balance={balance} savingsBalance={savingsBalance} ></Chart>
            </div>           

        </div>
    );
}

export default HomePage;