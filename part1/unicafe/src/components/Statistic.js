const Statistic = ({scoreType, score}) => {
    return (
        <tr>
            <td>
                {scoreType}
            </td> 
            <td>
                {score} {scoreType === 'positive' ? '%' : null}
            </td>
        </tr>
    )
}

export default Statistic