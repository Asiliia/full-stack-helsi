import Statistic from './Statistic';
import NoData from './NoData';

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
                    <Statistic scoreType={average} score={averageScore.toFixed(1)} />
                    <Statistic scoreType={positive} score={positiveScore.toFixed(1)} />
                </tbody>
            </table> 
        :
            <NoData info={'No feedback given'}/>
    )
}

export default Statistics