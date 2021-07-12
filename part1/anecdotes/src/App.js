import React, {useState} from 'react';
import Header from './components/Header';
import Button from './components/Button';
import Anecdote from './components/Anecdote';
import {partsNames, anecdotesData, getRandomFromZero, addOneToElementArray } from './Constants';
import './App.css';

const App = () => {   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotesData.length).fill(0));
  const [popular, setPopular] = useState({maxVotes: 0, maxAnecdote: ''});

  const [[firstHeader, secondHeader], [voteBtn, rndBtn], noVotes]  = partsNames;

  const clickHandle = () => {
      setSelected(getRandomFromZero(anecdotesData.length));
  }

  const voteHandle = (current) => () => {
    const newVotes = addOneToElementArray(votes, current);
    const maxVotes = Math.max(...newVotes)
    const maxAnecdote = anecdotesData[newVotes.indexOf(maxVotes)];
    setVotes(newVotes);
    setPopular({ maxVotes, maxAnecdote });
  }

  const PopularPart = ({popular}) => {
    const { maxVotes, maxAnecdote } = popular;
    return (
      (maxVotes > 0) 
      ?
        <>
        <Anecdote content={maxAnecdote}/>
        <Anecdote content={maxVotes}/>
        </>
      :
        <Anecdote content={noVotes}/>
    )
  }

  return (
    <div className="main">
      <Header content={firstHeader}/>
      <Anecdote content={anecdotesData[selected]}/>
      <Button name={voteBtn} buttonHandle={voteHandle(selected)}/>
      <Button name={rndBtn} buttonHandle={clickHandle}/>
      <Header content={secondHeader}/>
      <PopularPart popular={popular}/>
    </div>
  )
}

export default App;
