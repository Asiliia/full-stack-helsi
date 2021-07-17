import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './loader/Loader';
import data from './constants/Constants';
import Filter from './components/Filter';
import Country from './components/Country';

const App = () => {
  const {urlCountries, urlWeather, messages, countryDefault} = data;
  const [ newFilter, setNewFilter ] = useState('');
  const [ searchData, setSearchData ] = useState({
    countries: [], 
    notification: '', 
    isProcessing: false,
    country: countryDefault
  });
  const [ weatherData, setWeather ] = useState({
    temperature: null,
    weather_icon: '',
    wind: ''
  }); 

  const setSearchDataHandle = (notification, isProcessing, countries, country) => {
    setSearchData({
        notification, 
        isProcessing, 
        countries,
        country
    })
  }

  const getCountry = ({
    name, 
    capital, 
    population, 
    flag, 
    languages, 
    temperature, 
    weather_icon, 
    wind
    }) => {
  
    return {
      name,
      capital,
      population: population.toLocaleString('en'),
      flag,
      languages: languages.map(lang => {return { name: lang.name, id: lang.iso639_1 }}),
      temperature,
      weather_icon,
      wind
    }
  }

  const hook = () => {
      if (newFilter.length > 0) {
      setSearchDataHandle('', true, [], countryDefault);
      
      axios
      .get(urlCountries(newFilter))
      .then(response => {
        const res = response.data;
        if (res.length < 1) {
          setSearchDataHandle(messages.search, false, [], countryDefault);
        } else if (res.length === 1) {
          const {name, capital, population, flag, languages, numericCode} = res[0];
          const country = getCountry({...countryDefault, name, capital, population, flag, languages});
          const countries = [{ name: name, id: numericCode }];
          setSearchDataHandle('', false, countries, country)
        }
        else if (res.length > 1 && res.length < 11) {
          const countries = res.map(arr => { return { name: arr.name, id: arr.numericCode }});
          setSearchDataHandle('', false, countries, countryDefault)
        } else if (res.length > 10) {
          setSearchDataHandle(messages.tooMany, false, [], countryDefault);
        }
      })
      .catch(() => {
         setSearchDataHandle(messages.notFound, false, [], countryDefault);
      })
    }
  }

  useEffect(hook, [newFilter, messages, countryDefault, urlCountries, urlWeather]);

  const hookWeather = () => {
    if (searchData.country.capital !== '') {
      axios
      .get(urlWeather(searchData.country.capital))
      .then(response => {
        if (response.status !== 200) {
          setWeather({        
            temperature: 'token is expired',
            weather_icon: null,
            wind: 'token is expired'
          });
        } else {
          const { temperature, weather_icons, weather_descriptions, wind_speed, wind_dir } = response.data.current;
          setWeather({        
            temperature: temperature,
            weather_icon: weather_icons[0],
            wind: `${wind_speed} ${wind_dir} | ${weather_descriptions}`
          });
        }
    })
    }
  }

  useEffect(hookWeather, [urlWeather, searchData.country.capital]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const showCountry = (event) => {
    setNewFilter(event.target.parentElement.dataset.country);
  }

  const countryOrList = searchData.countries.length === 1 
  ? <Country country={searchData.country} weather={weatherData} /> 
  :  searchData.countries.map(country => { return ( 
    <div key={country.id} data-country={country.name}>
      {country.name}
      {<button key={country.id} onClick={showCountry}>show</button>}
    </div>
  )});


  const countiresToShow = searchData.notification 
    ? searchData.notification
    : countryOrList;

  const loader = searchData.isProcessing ? <Loader/> : null;
  
  return (
    <>
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange}
      />
      {countiresToShow}
      {loader}
    </>
  )
}
export default App

