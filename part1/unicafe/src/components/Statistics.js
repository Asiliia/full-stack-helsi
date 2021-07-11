import Statistic from "./Statistic";

const Statistics = ({buttons, score}) => {
    const [good, neutral, bad, all, average, positive] = buttons;
    const {goodScore, neutralScore, badScore, allScore, averageScore, positiveScore} = score;
    return (
        (allScore > 0)
        ?
            <table>
                <tbody>
                    <Statistic scoreType={good} score={goodScore} />
                    <Statistic scoreType={neutral} score={neutralScore} />
                    <Statistic scoreType={bad} score={badScore} />
                    <Statistic scoreType={all} score={allScore} />
                    <Statistic scoreType={average} score={averageScore} />
                    <Statistic scoreType={positive} score={positiveScore.toFixed(2)} />
                </tbody>
            </table> 
        :
            <>
                <p>No feedback given</p>
            </>       
    )
}

export default Statistics