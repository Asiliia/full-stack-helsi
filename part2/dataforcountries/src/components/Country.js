import React from 'react';
import './css/Country.css'

const Country = ({country}) => {
    const {name, capital, population, flag, languages} = country;
    console.log(languages);
    const lang = languages.map(lang => <li key={lang.id}>{lang.name}</li>);
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
        </>
        )
    }
export default Country

