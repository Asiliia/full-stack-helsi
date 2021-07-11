import React, { useState } from 'react';
import data from './constants/constants.js';
import ButtonGroup from './components/ButtonGroup';
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Statistics from './components/Statistics';

const App = () => {
  const [goodScore, setGood] = useState(0);
  const [neutralScore, setNeutral] = useState(0);
  const [badScore, setBad] = useState(0);

  const handleClick = (type) => () => {
    switch (type) {
        case 'good': setGood(goodScore + 1);
        break;
        case 'neutral': setNeutral(neutralScore + 1);
        break;
        case 'bad': setBad(badScore + 1);
        break;
    }
  }
 
   return (
    <div>
      <Header1 header={data.h1} />
      <Header2 header={data.h2.feedback}/>
      <ButtonGroup buttons={data.buttons} handleClick={handleClick}/>
      <Header2 header={data.h2.statistics}/>
      <Statistics buttons={data.buttons} score={[goodScore, neutralScore, badScore]}/>
    </div>
  )
}

export default App