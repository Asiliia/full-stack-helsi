const Statistics = ({buttons, score}) => {
    const [good, neutral, bad, all, average, positive] = buttons;
    const {goodScore, neutralScore, badScore, allScore, averageScore, positiveScore} = score;
    return (
        <>
            <p>{good}: {goodScore}</p>
            <p>{neutral}: {neutralScore}</p>
            <p>{bad}: {badScore}</p>
            <p>{all}: {allScore}</p>
            <p>{average}: {averageScore}</p>
            <p>{positive}: {positiveScore.toFixed(2)}%</p>
        </>
    )
}

export default Statistics