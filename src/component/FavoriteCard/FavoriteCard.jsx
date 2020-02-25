import React from 'react';
import './FavoriteCard.scss';
import { Link } from 'react-router-dom';

function FavoriteCard({favorite}) {
  
  return ( 
    <Link to="edit" className="favorite-card-container">
      <div className="favorite-card-container__card card">
          <div className="favorite-card-container__body card-body">
            <div className="favorite-card-container__top">
              <img 
                alt={"Profile photo of " + favorite.name} 
                src="https://i.ytimg.com/vi/7Xu_s1YJhyg/maxresdefault.jpg"
                className="favorite-card-container__img"/>
                <h2 className="favorite-card-container__name card-title"> {favorite.name} </h2>
            </div>
                
            <h2 className="favorite-card-container__account"> {favorite.accountModel.accountNumber} </h2>
            
          </div>
        </div>
    </Link>
  );
}

export default FavoriteCard;