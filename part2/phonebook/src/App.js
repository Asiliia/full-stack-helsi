import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [ newName, setNewName ] = useState('');

  const isExisting = (name) => {
    return persons.some(person => person.name === name) && name !== '';
  }

  const addPerson = (event) => {
    event.preventDefault();
    if (isExisting(newName)) {
      alert (`${newName} is already added to phonebook`);
    } else {
    const personObject = {
      name: newName.trim()
    }
    setPersons([...persons, personObject]);
    setNewName('');
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
       {persons.map(person => <div>{person.name}</div>)}
    </div>
  )
}

export default App
