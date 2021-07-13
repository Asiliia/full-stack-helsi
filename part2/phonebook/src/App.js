import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '123-456-7653' }
  ]);
  const [ newData, setNewData ] = useState({newName: '', newPhone: ''});

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
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
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
        </div>
        <div>
        <label htmlFor="phone">Enter your phone: </label>
          <input 
            id="phone"
            type="tel" 
            value={newData.newPhone}
            onChange={handlePhoneChange}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
            placeholder="123-456-7890"
            maxLength="12"
            required />
        </div>
        <p>
          <button type="submit">add</button>
        </p>
      </form>
      <h2>Numbers</h2>
       {persons.map(person => <div key={person.name}>{person.name} {person.phone}</div>)}
    </div>
  )
}

export default App
