import React , {useState, useEffect} from 'react';
import './FavoritePage.scss';
import Title from '../../component/shared/Title/Title';
import axios from 'axios';
import Favorites from '../../component/Favorites/Favorites';
import { Link } from 'react-router-dom';

function FavoritePage() {
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
    <div className="favorite-page-container">
        <header className="favorite-page-container__header d-flex justify-content-between">
            <Title> Favorites </Title>
            <Link to={'add-favorite'} className="btn btn-outline-primary">Add favorite</Link>
        </header>
        
        <section className="d-flex flex-column justify-content-center">
            {favorites.length !== 0 ?
              <Favorites favorites={favorites}></Favorites> :
              <div className="section-border">
                <div className="alert alert-info" role="alert">
                    You don't have favorite accounts
                </div>
              </div>
            }
        </section>
    </div>
  );
}

export default FavoritePage;