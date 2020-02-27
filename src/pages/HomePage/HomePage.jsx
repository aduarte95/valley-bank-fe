import React , {useState, useEffect} from 'react';
import './HomePage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import RecentTransactions from '../RecentTransactions/RecentTransactions';


function HomePage() {
    const [ user, setUser] = useState([]);
    const [ balance, setBalance] = useState();
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
            })
            .catch(function (error) {
            console.log(error);
            });
        }, []);
    
    return ( 
        <div className="home-page-container">
            <header className="favorite-page-container__header d-flex justify-content-between">
                <Title> Welcome back, {user.givenName}! </Title>
            </header>
            <div className="home-page-container__balance">
                <Title > Your balance </Title>
                <p className="home-page-container__balance-number" > {balance} </p>
            </div>

            <Title> Recent Transactions </Title>
            <section className="section-border d-flex flex-column justify-content-center">
                    { accounts &&
                    accounts.map( account => {
                        return  <div key={`recent-transaction-${account.id}`}>
                                    <RecentTransactions transactionsAccount={account} />
                                </div>
                    })}
            </section>
            

        </div>
    );
}

export default HomePage;