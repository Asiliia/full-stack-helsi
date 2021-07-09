import React from 'react';

const Total = (props) => {
    const [part1, part2, part3] = props.course.parts;

    return (
        <p>Number of exercises {part1.exercises + part2.exercises + part3.exercises} </p>
    )
}

export default Total