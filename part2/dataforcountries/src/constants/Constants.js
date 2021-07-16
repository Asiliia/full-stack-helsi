const data = {
    urlCountries: (filter) =>  `https://restcountries.eu/rest/v2/name/${filter}`,
    urlWeather: (filter) => `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${filter}`,
    messages: {
        search: 'Search for a country', 
        tooMany: 'Too many matches, specify another filter', 
        notFound: 'Not found'
    },
    countryDefault: {
        name: '',
        capital: '',
        population: 0,
        languages: [],
        flag: ''
      }
  }

  export default data;