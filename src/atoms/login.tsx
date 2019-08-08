import React from 'react'

const Login: React.FC = () => {
    return (
        <div>
            <div>Login</div>
            <input type="text" name="email"></input>
            <input type="text" name="password"></input>
            <input type="submit" name="submit" value="submit"></input>
        </div>

    )
}


export default Login