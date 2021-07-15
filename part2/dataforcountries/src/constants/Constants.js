const data = {
    url: (filter) =>  `https://restcountries.eu/rest/v2/name/${filter}`,
    messages: {
        search: 'Search for a country', 
        tooMany: 'Too many matches, specify another filter', 
        notFound: 'Not found'
    }
  }

  export default data;