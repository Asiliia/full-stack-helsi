import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './loader/Loader';
import data from './constants/Constants';

const App = () => {
  const [ newFilter, setNewFilter ] = useState('');
  const [ searchData, setSearchData ] = useState({countries: [], notification: '', isProcessing: false});

  

  const hook = () => {
      if (newFilter.length > 0) {
      setSearchData({
        notification: '', 
        isProcessing: true, 
        countries: []});
      axios
      .get(data.url(newFilter))
      .then(response => {
        const res = response.data;
        console.log(res);
        if (res.length < 1) {
          setSearchData({
            notification: data.messages.search, 
            isProcessing: false, 
            countries: []});
        } else if (res.length > 0 && res.length < 11) {
          setSearchData({
            notification: '', 
            isProcessing: false, 
            countries: res.map(arr => { return { name: arr.name, id: arr.numericCode }}
          )});
        } else if (res.length > 10) {
          setSearchData({
            notification: data.messages.tooMany,
            isProcessing: false, 
            countries: []});
        }
      })
      .catch(error => {
        setSearchData({
          notification: data.messages.notFound, 
          isProcessing: false, 
          countries: []
        });
      })
    }
  }

  useEffect(hook, [newFilter]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const countiresToShow = searchData.notification 
  ? searchData.notification
  : searchData.countries.map(country => <p>{country.name}</p>);

  const loader = searchData.isProcessing ? <Loader/> : null;
  
  return (
    
    <>
    <p>
        <label htmlFor="filter">Find countries: </label>
        <input 
          id="filter"
          type="text"
          value={newFilter}
          onChange={handleFilterChange}
          placeholder={'Russia'}
          maxLength="30"
          size="30"
        />
      </p>
      <div>
        {countiresToShow}
        {loader}
      </div>
    </>
  )
}

export default App

