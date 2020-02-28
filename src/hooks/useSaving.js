import { useState , useEffect } from "react";

import axios from 'axios';

//Login is the only page without navbar so this is needed to know where tho put it and not.

export const useSaving = (accountId) => {
    const [ savings, setSavings ] = useState([]);
    const [reload, setReload] = useState(false)
    const getAccountUrl = `http://localhost:8080/api/v1/account/${accountId}`;
  
  useEffect(() => {
    if(accountId) {
      axios.get(getAccountUrl)
        .then(  response => {
          setSavings(response.data.savings);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
   if (reload) {
    axios.get(getAccountUrl).then(response => setSavings(response.data.savings))
    setReload(false)
   }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload])

  function getSavings(accountId) {
    
    if(accountId) {
      axios.get(`http://localhost:8080/api/v1/account/${accountId}`)
        .then(  response => {
          setSavings(response.data.savings);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return {
   savings,
   reload: () => {
    setReload(true)
   },
   getSavings
  }
 }