import React from 'react';
import './Favorites.scss';
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