import React from 'react';

const Filter = ({newFilter, handleFilterChange}) => {
    return (
    <p>
        <label htmlFor="filter">Find countries: </label>
                <input 
                id="filter"
                type="text"
                value={newFilter}
                onChange={handleFilterChange}
                placeholder={'Russia'}
                maxLength="30"
                size="30"
        />
    </p>
    )
}

export default Filter