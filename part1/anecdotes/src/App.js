import React, {useState} from 'react';
import './App.css';

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  console.log(votes);

  const clickHandle = () => {
      const rand = Math.floor(Math.random() * ((anecdotes.length - 1) + 1));
      setSelected(rand);
  }

  const voteHandle = (current) => () => {
    setVotes([
      ...votes.slice(0, (current)), 
      votes[current] + 1,
      ...votes.slice((current) + 1)
    ]);
  }

  return (
    <div className="main">
      <p>💡 {anecdotes[selected]}</p>
      <button onClick={voteHandle(selected)}>vote</button>
      <button onClick={clickHandle}>next anecdote</button>
      <p>{votes}</p>
    </div>
  )
}

export default App;
