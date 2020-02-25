import React, { useState } from 'react';
import './Favorites.scss';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FavoriteCard from '../FavoriteCard/FavoriteCard';

function Favorites({ favorites}) {

  return (   
    <div>
      {favorites &&
        <div className="favorite-container container">
          {
            favorites.map( (favorite, i) => {
              return <FavoriteCard favorite={favorite}></FavoriteCard>
            })
          }
        </div>
      }
    </div>
  );
}

export default Favorites;