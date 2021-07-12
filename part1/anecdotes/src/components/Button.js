const Button = ({name, buttonHandle}) => {
    return (
        <button onClick={buttonHandle}>{name}</button>
    )
}

export default Button;