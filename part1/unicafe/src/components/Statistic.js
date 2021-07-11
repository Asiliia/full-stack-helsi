const Statistic = ({scoreType, score}) => {
    return (
        <>
            <p>{scoreType}: {score} {scoreType === 'positive' ? '%' : null}</p> 
        </>
    )
}

export default Statistic