import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) => {
    const {name, parts} = course;
    
    const getTotal = () => parts.reduce((acc, part) => part.exercises + acc, 0);

    return (
      <>
        <Header name={name}/>
        <Content parts={parts}/>
        <Total amount={getTotal()}/>
      </>
    )
  }

export default Course