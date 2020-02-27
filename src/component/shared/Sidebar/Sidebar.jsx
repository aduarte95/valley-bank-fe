import React from 'react';
import './Sidebar.scss';
import MenuItem from '../MenuItem/MenuItem';



function Sidebar({children}) {

  return (   
    <div className="sidebar-container">
        <div className="sidebar-container__menu d-flex flex-column justify-content-center">
            <MenuItem link="/dashboard">
                <i className="las la-home"></i>
                <p className="sidebar-container__description"> Home </p>
            </MenuItem>
            <MenuItem link="/dashboard/accounts">
                <i className="las la-wallet"></i>
            <p className="sidebar-container__description"> Accounts </p>
            </MenuItem>
            <MenuItem link="/dashboard/transactions">
                <i className="las la-exchange-alt"></i>
                <p className="sidebar-container__description"> Transactions </p>
            </MenuItem>

            <MenuItem link="/dashboard/savings">
                <i className="las la-piggy-bank"></i>
                <p className="sidebar-container__description"> Savings </p>
            </MenuItem>

            <MenuItem link="/dashboard/favorites">
                <i className="lar la-star"></i>
                <p className="sidebar-container__description"> Favorites </p>
            </MenuItem>

            {/* <MenuItem link="/dashboard/messages">
                <i className="fas fa-envelope"></i>
                <p className="sidebar-container__description"> Messages </p>
            </MenuItem>
            <MenuItem link="/dashboard/settings">
                <i className="fas fa-cog"></i>
                <p className="sidebar-container__description"> Settings </p>
            </MenuItem> */}
        </div>
  
        {children}
    </div>   
  );
}

export default Sidebar;