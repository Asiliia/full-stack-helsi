import React from "react";
import Person from './Person';

const Persons = ({persons, handleClick}) => {
    return (
                persons.map(person => {return (
                    <div key={person.id} >
                        <Person person={person}/>
                        <button data-personid={person.id} onClick={handleClick}>delete</button>
                    </div>
                )})
            )
}
export default Persons