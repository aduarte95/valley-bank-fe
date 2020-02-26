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
  
  return ( 
    <div className="saving-container">
    {savings.length !== 0 &&
      <div>
          {savings && savings.map( saving => {
            return  <div className=" saving-container__savings row" key={`saving-${saving.id.toString()}`}>
                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Name
                            </h3> 
                            <p className="saving-container__content">
                              {saving.name}
                            </p>
                          </div>
                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Balance
                            </h3> 
                            <p className="saving-container__content">
                              {saving.currentBalance}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Saving ammount
                            </h3> 
                            <p className="saving-container__content">
                              {saving.amount}
                            </p>
                          </div>

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                            Related account
                            </h3> 
                            <p className="saving-container__content">
                              {saving.accountModel.name} - {String(saving.accountModel.accountNumber).padStart(17, '0')}
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