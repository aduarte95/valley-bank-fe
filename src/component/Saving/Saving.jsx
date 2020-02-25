import React from 'react';
import './Saving.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';


function Saving({account}) {
  const [ savings, setSavings ] = useState([]);

  useEffect(() => {
    const getAccountUrl = `http://localhost:8080/api/v1/account/${account.id}`;
    
    axios.get(getAccountUrl)
      .then(  response => {
        setSavings(response.data.savings);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [account]);
  console.log(savings)
  return ( 
    <div className="saving-container">
    {savings.length !== 0 &&
      <div className="section-border">
          
            <div className="saving-container__account-name col">
                {account.name}
            </div>
          {savings && savings.map( saving => {
            return  <div className="row" key={`saving-${saving.id.toString()}`}>
                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title">
                            Balance
                            </h3> 
                            <p className="saving-container__content">
                              {saving.currentBalance}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title">
                              Start date
                            </h3> 
                            <p className="saving-container__content">
                              {saving.startDate}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title">
                              End date
                            </h3> 
                            <p className="saving-container__content">
                              {saving.endDate}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title">
                            Initial balance
                            </h3> 
                            <p className="saving-container__content">
                              {saving.initialBalance}
                            </p>
                          </div>
                      </div>
          })}
          </div>      
        } 
        </div>
  )
}

export default Saving;