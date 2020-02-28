import React from 'react';
import './FavoriteCard.scss';
import { Link } from 'react-router-dom';

function FavoriteCard({favorite}) {
  
  return ( 
    <Link to={`${favorite.id}/accounts`} className="favorite-card-container">
      <div className="favorite-card-container__card card">
          <div className="favorite-card-container__body card-body">
            <div className="favorite-card-container__top">
              <div className="favorite-card-container__img">
                {favorite.name[0]}
              </div>
              <h2 className="favorite-card-container__name card-title"> {favorite.name} </h2>
            </div>
                
            <h2 className="favorite-card-container__account"> {String(favorite.accountModel.accountNumber).padStart(17, '0')} </h2>
            
          </div>
        </div>
    </Link>
  );
}

export default FavoriteCard;