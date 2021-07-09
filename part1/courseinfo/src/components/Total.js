import React from 'react';

const Total = (props) => {
    let [part1, part2, part3] = props.parts;

    return (
        <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises} </p>
    )
}

export default Total