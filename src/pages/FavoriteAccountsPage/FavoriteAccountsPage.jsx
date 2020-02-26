import React from 'react';
import './FavoriteAccountsPage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import { useState, useEffect } from 'react';
import FavoriteAccount from '../../component/FavoriteAccount/FavoriteAccount';

function FavoriteAccountsPage({match}) {
    const [ favoriteAccounts, setFavoriteAccounts ] = useState([]);
    const [ user, setUser ] = useState([]);

    useEffect(() => {    
        var userId = sessionStorage.getItem('user');

        const getUserUrl = `http://localhost:8080/api/v1/user/${userId}`;
        

        axios.get(getUserUrl)
          .then(  response => {
                setUser(response.data.favorites);
                
                setFavoriteAccounts([response.data.favorites.find( fav => fav.id === Number(match.params.id))]);
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [match.params.id]);

    return (
            <div className="account-page-container">
                <header className="account-page-container__header d-flex justify-content-between">
                    <Title> {user.givenName} asociated accounts </Title>
                </header>
                
                <section className="section-border d-flex flex-column justify-content-center">
                    { favoriteAccounts &&
                        favoriteAccounts.map( (fav, i) => {
                            return  <div key={`favorite-accounts-${i}`}>
                                        <FavoriteAccount favorite={fav}></FavoriteAccount>
                                    </div>
                            })
                    }
                </section>
            </div>
    );
}

export default FavoriteAccountsPage;