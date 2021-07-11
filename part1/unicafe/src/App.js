import React, { useState } from 'react'

const Header1 = ({header}) => {
    return (
        <>
            <h1>Unicafe</h1>
        </>
    )
}
const Header2 = ({header}) => {
    return (
        <>
            <h2>give feedback</h2>
        </>
    )
}
const Button = ({name}) => {
    return (
        <>
            <button>{name}</button>
        </>
    )
}
const ButtonGroup = ({buttons}) => {
    const [good, neutral, bad] = buttons
    return (
        <>
            <Button name={good}/>
            <Button name={neutral}/>
            <Button name={bad}/>
        </>
    )
}

const Statistics = ({buttons}) => {
    const [good, neutral, bad] = buttons
    return (
        <>
            <p>{good} - 6</p>
            <p>{neutral} - 2</p>
            <p>{bad} - 1</p>
        </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const data = {
      h1: 'Unicafe',
      h2: {feedback: 'give feedback', statistics: 'statistics'},
      buttons: ['good', 'neutral', 'bad']
}

  return (
    <div>
      <Header1/>
      <Header2/>
      <ButtonGroup buttons={data.buttons}/>
      <Header2/>
      <Statistics buttons={data.buttons}/>
    </div>
  )
}

export default App