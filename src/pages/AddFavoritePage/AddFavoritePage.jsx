import React from 'react';
import './AddFavoritePage.scss';
import Title from '../../component/shared/Title/Title';
import AddFavoriteForm from '../../component/AddFavoriteForm/AddFavoriteForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

function AddFavoritePage() {
  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    var userId = sessionStorage.getItem('user');
    const getUserUrl = `https://valley-bank-be.herokuapp.com/api/v1/user/${userId}`;

    axios.get(getUserUrl)
      .then(  response => {
          
        setFavorites(response.data.favorites);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  
  return ( 
    <div className="create-account-page-container">
        <header className="create-account-page-container__header d-flex justify-content-between">
            <Title> Add new favorite </Title>
        </header>
        
        <section className="section-border d-flex flex-column justify-content-center">
            <AddFavoriteForm favorites={favorites}></AddFavoriteForm>
        </section>
    </div>
  );
}

export default AddFavoritePage;