import React from 'react';

const AddForm = ({addPerson, newName, handleNameChange, newPhone, handlePhoneChange}) => {
    return (
        <form onSubmit={addPerson}>
        <p>
        <label htmlFor="name">Enter your name: </label>
           <input
            id="name" 
            type="text"
            value={newName} 
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
            value={newPhone}
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
    )
}

export default AddForm