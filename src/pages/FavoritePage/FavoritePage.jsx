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
      const getUserUrl = `http://localhost:8080/api/v1/user/${userId}`;

      axios.get(getUserUrl)
        .then(  response => {
          setFavorites(response.data.favorites);
        })
        .catch(function (error) {
          console.log(error);
        });
    }, []);
  
  return ( 
    <div className="transaction-page-container">
        <header className="transaction-page-container__header d-flex justify-content-between">
            <Title> Favorites </Title>
            <Link to={'/favorite/add-favorite'} className="btn btn-outline-primary">Add favorite</Link>
        </header>
        
        <section className="section-border d-flex flex-column justify-content-center">
            <Favorites favorites={favorites}></Favorites>
        </section>
    </div>
  );
}

export default FavoritePage;