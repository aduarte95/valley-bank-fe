import axios from 'axios';
import { useState } from 'react';

export const getAccountSavings = (accountId) => {
    const getAccountUrl = `http://localhost:8080/api/v1/account/${accountId}`;
    const [ savings, setSavings] = useState([]);

    axios.get(getAccountUrl)
        .then(  response => {
          setSavings(response.data.savings);
        })
        .catch(function (error) {
          console.log(error);
        });
  
  return {
   savings
  }
 }