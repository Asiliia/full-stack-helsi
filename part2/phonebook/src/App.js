import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import AddForm from './components/AddForm';
import service from './services/service';
import Notification from './components/Notification';

const timoutTime = 10000;
const intervalTime = 1000;
const intervalShowTime = 10;

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newData, setNewData ] = useState({newName: '', newPhone: ''});
  const [ newFilter, setNewFilter ] = useState('');
  const [ notificationData, setNotificationData] = useState({message: '', isError: false});
  let [ timer, setTimer ] = useState(10);

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
    const existPhone = chekExistingPerson('phone', newData.newPhone);
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
        showNotification(`Created '${returnedPerson.name}'`, false);
      })
      .catch(() => {
        showNotification(`Can't add '${newData.newName}'`, true);
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
        showNotification(`Updated '${changedPerson.name}'`, false);
      })
      .catch(() => {
        showNotification(`Can't update '${person.name}'`, true);
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
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        showNotification(`Deleted '${person.name}'`, false);
      })
      .catch(() => {
        showNotification(`Can't delete '${person.name}'`, true);
      });
  }

  const showNotification = (message, isError) => {
    setNotificationData({message, isError});
    setTimeout(() => {
      setNotificationData({message: '', isError: false});
    }, timoutTime);
    let timerInterval = intervalShowTime;
    let id = setInterval(() => {
        if (timerInterval === 0) {
          clearInterval(id);
          setTimer(intervalShowTime);
        } else {
          setTimer(--timerInterval);
        }
      }, intervalTime);
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
      <Notification notificationData={notificationData} timer={timer} />
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
