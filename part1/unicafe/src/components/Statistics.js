const Statistics = ({buttons, score}) => {
    console.log(score);
    const [good, neutral, bad] = buttons;
    const [goodScore, neutralScore, badScore] = score;
    return (
        <>
            <p>{good} - {goodScore}</p>
            <p>{neutral} - {neutralScore}</p>
            <p>{bad} - {badScore}</p>
        </>
    )
}

export default Statistics