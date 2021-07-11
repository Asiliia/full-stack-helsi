import Button from "./Button";

const ButtonGroup = ({buttons, handleClick}) => {
    const [good, neutral, bad] = buttons;
    return (
        <>
            <Button name={good} handleClick={handleClick}/>
            <Button name={neutral} handleClick={handleClick}/>
            <Button name={bad} handleClick={handleClick}/>
        </>
    )
}

export default ButtonGroup