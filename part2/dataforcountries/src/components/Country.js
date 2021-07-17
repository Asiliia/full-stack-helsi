import React from 'react';
import './css/Country.css'
import notFoundImg from '../img/notfound.png';

const Country = ({country, weather}) => {
    let counter = 0;
    const {name, capital, population, flag, languages} = country;
    const {temperature, weather_icon, wind} = weather;
    const lang = languages.map(lang => <li key={counter++}>{lang.name}</li>);

    return (
        <>
            <h2>{name}</h2>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h3>Languages</h3>
            <div>
                <ul>
                   {lang}
                </ul>
            </div>
            <img className="flag" alt="Flag"src={flag}/>
            <h3>Weather in {capital}</h3>
            <p>temperature: {temperature}</p>
            <img className="flag" src={weather_icon ? weather_icon : notFoundImg} alt="Weather Icon" />
            <p>wind: {wind}</p>
        </>
        )
    }
export default Country

