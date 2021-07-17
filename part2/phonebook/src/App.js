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

  const chekExistingPerson = (param, value) => {
    return persons.find(person => person[param] === value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const existPhone = chekExistingPerson('phone',newData.newPhone);
    const existName =  chekExistingPerson('name', newData.newName);
    if (existPhone) {
      // eslint-disable-next-line no-restricted-globals
      const conf = confirm(`${newData.newPhone} is already added to phonebook (${existPhone.name}), replace the old name with a new one?`);
      if (!conf) {
        return;
      }
      updatePerson(existPhone.id, 'name', newData.newName);
    }
    else if (existName) {
      // eslint-disable-next-line no-restricted-globals
      const conf = confirm(`${newData.newName} is already added to phonebook, replace the old number with a new one?`);
      if (!conf) {
        return;
      }
      updatePerson(existName.id, 'phone', newData.newPhone);
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

  const updatePerson = (id, newParam, newValue) => {
    const person = persons.find(n => n.id === id);
    const changedPerson = {...person};
    changedPerson[newParam] = newValue

    service
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(persons => persons.id !== id ? persons : returnedPerson));
        setNewData({newName: '', newPhone: ''});
      })
      .catch(error => {
        alert(
          `the note '${person.content}' was already deleted from server`
        )
      })
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Delete ${person.name}?`)) {
      return;
    }
    
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
