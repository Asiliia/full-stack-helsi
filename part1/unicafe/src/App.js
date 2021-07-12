import React, { useState } from 'react';
import { data, getSum, getAverage, getPosPercent } from './constants/constants.js';
import ButtonGroup from './components/ButtonGroup';
import Header1 from './components/Header1';
import Header2 from './components/Header2';
import Statistics from './components/Statistics';

const App = () => {
  const [score, setClicks]= useState({
      goodScore: 0,
      neutralScore: 0,
      badScore: 0,
      allScore: 0,
      totalScore: 0,
      averageScore: 0,
      positiveScore: 0
     });

  const handle = (total, typeAverage, score, allScore, goodScore) => {
    const totalScoreNew = getSum(total, typeAverage);
    const scoreNew = getSum(score, 1);
    const averageScoreNew = getAverage(totalScoreNew, allScore);
    const positiveScoreNew = getPosPercent(goodScore, allScore);
    return [ totalScoreNew, scoreNew, averageScoreNew, positiveScoreNew ];
  }
  
  const handleClick = (type) => () => {
    const allScore = getSum(score.allScore, 1);

    switch (type) {
        case 'good': {
                const [ totalScore, goodScore, averageScore, positiveScore ] = handle(
                    score.totalScore, 
                    data.average.good, 
                    score.goodScore, 
                    allScore, 
                    score.goodScore + 1
                );
                setClicks({
                    ...score, 
                    goodScore,
                    allScore,
                    totalScore,
                    averageScore,
                    positiveScore
                });
            }
            break;
        case 'neutral': {
                const [ totalScore, neutralScore, averageScore, positiveScore ] = handle(
                    score.totalScore, 
                    data.average.neutral, 
                    score.neutralScore, 
                    allScore, 
                    score.goodScore
                );
                setClicks({
                    ...score, 
                    neutralScore,
                    allScore,
                    totalScore,
                    averageScore,
                    positiveScore
                });
            } 
            break;
        case 'bad': {
                const [ totalScore, badScore, averageScore, positiveScore ] = handle(
                    score.totalScore, 
                    data.average.bad, 
                    score.badScore, 
                    allScore, 
                    score.goodScore
                );
                setClicks({
                    ...score, 
                    badScore,
                    allScore,
                    totalScore,
                    averageScore,
                    positiveScore
                });
            }
            break;
        default:
    };
  }
 
   return (
    <div>
      <Header1 header={data.h1} />
      <Header2 header={data.h2.feedback}/>
      <ButtonGroup buttons={data.buttons} handleClick={handleClick}/>
      <Header2 header={data.h2.statistics}/>
      <Statistics buttons={data.statistics} score={score}/>
    </div>
  )
}

export default App