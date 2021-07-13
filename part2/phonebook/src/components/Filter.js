import React from 'react';

const Filter = ({newFilter, handleFilterChange}) => {
    return (
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
    )
}

export default Filter