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
        <div className="favorite-container">
          {
            favorites.map( favorite => {
              return <FavoriteCard  key={`saving-${favorite.id.toString()}`} favorite={favorite}></FavoriteCard>
            })
          }
        </div>
      }
    </div>
  );
}

export default Favorites;