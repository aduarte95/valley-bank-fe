import React from 'react';
import './Card.scss';
import Title from '../Title/Title';
import { Link } from 'react-router-dom';

function Card({children}) {
  

  return (   
    <div class="card">
      <div class="card-header">
        
      </div>
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <div class="card-footer text-muted">
        2 days ago
      </div>
    </div>
      
  );
}

export default Card;