import React from 'react';
import './Saving.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {Link}  from 'react-router-dom';

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
                          <div className="saving-container__info col-2"> 
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
                            <p className={(saving.amount === 0 ? 'red ' : '' ) + "saving-container__content"}>
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

                          <div className="saving-container__info col"> 
                            <h3 className="saving-container__title bold">
                              Actions
                            </h3> 
                            <div className="saving-container__content">
                              <div className="d-flex ">
                                <button 
                                className="saving-container__action app-link action-container" 
                                to={`${account.id}/transactions`}
                                onClick={() => withdrawSaving(saving)}>
                                  <i className="saving-container__icon action-icon las la-redo-alt"></i>
                                  Withdraw savings
                                </button>
                              </div>
                            </div>
                          </div>  
                      </div>
          })}
          </div>      
        } 
        </div>
  )
}

function withdrawSaving(saving) {
    const getAccount = `http://localhost:8080/api/v1/account/${saving.accountModel.id}`;
    const putAccount = `http://localhost:8080/api/v1/account`;
    const putSaving = `http://localhost:8080/api/v1/saving`

    console.log('hola')
    axios.get(getAccount)
      .then(  response => {
          var account = response.data;
          account.savingAmount = saving.amount;
          console.log(account)
          axios.put(putAccount, account)
          .then (
            response => {
              saving.amount = 0;
              console.log(saving)
              axios.put(putSaving, saving)
              .catch( e => console.log(e));
            }

          )
      })
      .catch(function (error) {
        console.log(error);
      });
}

export default Saving;