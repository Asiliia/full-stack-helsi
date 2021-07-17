import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import service from './services/service';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newData, setNewData ] = useState({newName: '', newPhone: ''});
  const [ newFilter, setNewFilter ] = useState('');

  const hook = () => {
    service
    .getAll()
    .then(initialPersons => {
        setPersons(initialPersons)
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
      };

      service
      .create(personObject)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson]);
        setNewData({newName: '', newPhone: ''});
      })
    }
  };

  const updatePerson = (id) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, name: person.name + 'Upd ' }

    service
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(persons => persons.id !== id ? persons : returnedPerson))
      })
      .catch(error => {
        alert(
          `the note '${person.content}' was already deleted from server`
        )
        //setPersons(person.filter(n => n.id !== id)) delete from statew
      })
  }

  const deletePerson = (id) => {
    service
      .remove(id)
      .then(deletedPerson => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
      });
      
  }

  const handleNameChange = (event) => {
    setNewData({...newData, newName: event.target.value});
  }

  const handlePhoneChange = (event) => {
    setNewData({...newData, newPhone: event.target.value});
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const handleClick = (event) => {
    deletePerson(+event.target.dataset.personid);
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
      <Persons persons={personToShow} handleClick={handleClick}/>
    </div>
  )
}

export default App
