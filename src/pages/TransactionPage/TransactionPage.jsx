import React , {useState, useEffect} from 'react';
import './TransactionPage.scss';
import Title from '../../component/shared/Title/Title';
import TransactionForm from '../../component/TransactionForm/TransactionForm';
import axios from 'axios';

function TransactionPage() {
  const [ accounts, setAccounts ] = useState([]);
  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
      var userId = sessionStorage.getItem('user');
      const getUserUrl = `http://localhost:8080/api/v1/user/${userId}`;

      axios.get(getUserUrl)
        .then(  response => {
            
          setAccounts(response.data.accounts);
          setFavorites(response.data.favorites);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  
  return ( 
    <div className="transaction-page-container">
        <header className="transaction-page-container__header d-flex justify-content-between">
            <Title> Transactions </Title>
        </header>
        
        <section className="section-border d-flex flex-column justify-content-center">
            <TransactionForm accounts={accounts} favorites={favorites}></TransactionForm>
        </section>
    </div>
  );
}

export default TransactionPage;