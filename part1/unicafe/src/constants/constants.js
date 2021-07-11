export const data = {
    h1: 'Unicafe',
    h2: {feedback: 'give feedback', statistics: 'statistics'},
    buttons: ['good', 'neutral', 'bad'],
    statistics: ['good', 'neutral', 'bad', 'all', 'average', 'positive'],
    average: { bad: -1, neutral: 0, good: 1 }
  };

export const getSum = (param1, param2) => {
  return param1 + param2;
}

export const getAverage = (totalScore, all) => {
  return (totalScore) / all;
}

export const getPosPercent = (pos, all) => {
  return all > 0 ? ((pos/all) * 100) : 0;
}