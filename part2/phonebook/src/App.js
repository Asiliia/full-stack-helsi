import React, { useState } from 'react';
import Persons from './components/Persons';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '04-40-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);
  const [ newData, setNewData ] = useState({newName: '', newPhone: ''});
  const [ newFilter, setNewFilter ] = useState('');

  const isExisting = (name) => {
    return persons.some(person => person.name === name) && name !== '';
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (isExisting(newData.newName) || isExisting(newData.newPhone)) {
      alert (`${newData.newName} is already added to phonebook`);
    }
    else {
      const personObject = {
        name: newData.newName.trim(),
        phone: newData.newPhone.trim()
      }
      setPersons([...persons, personObject]);
      setNewData({newName: '', newPhone: ''});
    }
  };

  const handleNameChange = (event) => {
    setNewData({...newData, newName: event.target.value});
  }

  const handlePhoneChange = (event) => {
    setNewData({...newData, newPhone: event.target.value});
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const personToShow = newFilter 
  ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()), []) 
  : persons;
  
  return (
    <div>
      <h2>Search</h2>
        <p>
          <label htmlFor="filter">Filter shown with: </label>
          <input 
            id="filter"
            type="text"
            value={newFilter}
            onChange={handleFilterChange}
            maxLength="20"
            size="20"
          />
        </p>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <p>
        <label htmlFor="name">Enter your name: </label>
           <input
            id="name" 
            type="text"
            value={newData.newName} 
            onChange={handleNameChange}
            placeholder="Ann Smith"
            maxLength="30"
            size="30"
            required/>
        </p>
        <p>
        <label htmlFor="phone">Enter your phone: </label>
          <input 
            id="phone"
            type="tel" 
            value={newData.newPhone}
            onChange={handlePhoneChange}
            pattern="[0-9]{2}-[0-9]{2}-[0-9]{6}" 
            placeholder="12-34-567890"
            maxLength="12"
            required />
        </p>
        <p>
          <button type="submit">add</button>
        </p>
      </form>
      <h2>Numbers</h2>
      <Persons persons={personToShow}/>
    </div>
  )
}

export default App
