import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import axios from 'axios';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newData, setNewData ] = useState({newName: '', newPhone: ''});
  const [ newFilter, setNewFilter ] = useState('');

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, []);

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
      <h1>Phonebook</h1>
      <h2>Search</h2>
       <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <AddForm 
        addPerson={addPerson}
        newName={newData.newName}
        handleNameChange={handleNameChange}
        newPhone={newData.newPhone}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personToShow}/>
    </div>
  )
}

export default App
