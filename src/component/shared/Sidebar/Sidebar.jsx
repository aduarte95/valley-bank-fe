import React from 'react';
import './Sidebar.scss';
import MenuItem from '../MenuItem/MenuItem';

function Sidebar({children}) {

  return (   
    <div className="sidebar-container">
        <div className="sidebar-container__menu d-flex flex-column justify-content-center">
            <MenuItem link="/home">
                <i className="fas fa-home"></i>
                <p className="sidebar-container__description"> Home </p>
            </MenuItem>
            <MenuItem link="/accounts">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="22.2" height="19.5"
                viewBox="0 0 172 172"
                style={{fill:"#000000"}}>
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}>
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path d="M86,5.73333c-5.07352,0 -9.58399,2.23982 -12.73203,5.73333h-15.92344c-4.05347,0 -6.83807,4.09987 -5.33021,7.86094l5.31901,15.0724h57.33333l5.31901,-15.0724c1.50787,-3.76107 -1.27674,-7.86094 -5.33021,-7.86094h-15.92344c-3.14804,-3.49351 -7.65851,-5.73333 -12.73203,-5.73333zM57.33333,45.86667c0,0 -40.13333,34.4 -40.13333,74.53333c0,22.93333 17.2,34.4 28.66667,34.4h40.13333h40.13333c11.46667,0 28.66667,-11.46667 28.66667,-34.4c0,-40.13333 -40.13333,-74.53333 -40.13333,-74.53333zM80.26667,65.93333h11.46667v9.26067c7.74,1.73147 12.91648,7.00524 13.16875,14.13177h-9.6638c-0.47587,-3.87573 -4.08285,-6.4612 -9.04792,-6.4612c-5.13707,0 -8.53281,2.38139 -8.53281,6.12526c0,3.0272 2.33436,4.76969 8.08489,5.99089l5.9237,1.25417c9.86707,2.07547 14.10938,6.33874 14.10938,13.95261c0,8.19867 -5.25872,13.69514 -14.04219,15.36354v9.18229h-11.46667v-9.15989c-8.43373,-1.5824 -13.73259,-6.7596 -14.04219,-14.33333h9.92136c0.47587,3.97893 4.49476,6.52839 10.27969,6.52839c5.33773,0 9.11511,-2.58377 9.1151,-6.29323c0,-3.1304 -2.44562,-4.93031 -8.46562,-6.22604l-6.39401,-1.36614c-8.944,-1.86907 -13.33672,-6.5266 -13.33672,-14.0086c0,-7.52787 4.98173,-12.8922 12.92239,-14.65807z"></path>
                        </g>
                    </g>
            </svg>
            <p className="sidebar-container__description"> Accounts </p>
            </MenuItem>

            <MenuItem link="/transactions">
                <i class="fas fa-exchange-alt"></i>
                <p className="sidebar-container__description"> Transactions </p>
            </MenuItem>

            <MenuItem link="/savings">
                <i className="fas fa-piggy-bank"></i>
                <p className="sidebar-container__description"> Savings </p>
            </MenuItem>

            <MenuItem link="/budgets">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                width="20" height="20"
                viewBox="0 0 172 172"
                style={{fill:"#000000"}}>
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: "normal"}}>
                        <path d="M0,172v-172h172v172z" fill="none"></path>
                        <g fill="#ffffff">
                            <path d="M39.56,6.88c-6.62469,0 -12.04,5.33469 -12.04,11.9325v132.225c0,7.78031 6.38281,14.0825 14.19,14.0825h88.58c7.80719,0 14.19,-6.30219 14.19,-14.0825v-101.1575c0,-0.91375 -0.3225,-1.8275 -0.9675,-2.4725l-39.56,-39.56c-0.645,-0.645 -1.55875,-0.9675 -2.4725,-0.9675zM103.2,16.8775l31.2825,31.2825h-25.585c-3.15781,0 -5.6975,-2.53969 -5.6975,-5.6975zM58.48,82.56h55.04v48.16h-55.04zM65.36,89.44v6.88h17.2v-6.88zM89.44,89.44v6.88h17.2v-6.88zM65.36,103.2v6.88h17.2v-6.88zM89.44,103.2v6.88h17.2v-6.88zM65.36,116.96v6.88h17.2v-6.88zM89.44,116.96v6.88h17.2v-6.88z"></path>
                    </g>
                </g>
            </svg>
                <p className="sidebar-container__description"> Budgets </p>
            </MenuItem>

            <MenuItem link="/services">
                <i className="fas fa-mobile"></i>
                <p className="sidebar-container__description"> Services </p>
            </MenuItem>

            <MenuItem link="/favorites">
                <i className="fas fa-star"></i>
                <p className="sidebar-container__description"> Favorites </p>
            </MenuItem>

            <MenuItem link="/messages">
                <i className="fas fa-envelope"></i>
                <p className="sidebar-container__description"> Messages </p>
            </MenuItem>
            <MenuItem link="/settings">
                <i className="fas fa-cog"></i>
                <p className="sidebar-container__description"> Settings </p>
            </MenuItem>
        </div>
  
        {children}
    </div>   
  );
}

export default Sidebar;