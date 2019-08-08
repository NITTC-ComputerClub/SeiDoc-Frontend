import React, {useState} from 'react'

type loginData = {
    email: string,
    password: string
}
const Login: React.FC = () => {
    let [loginData, setLoginData] = useState<loginData>({email: '',password:''})

    const onClickSubmit = () => {
        console.log(loginData.email)
        console.log(loginData.password)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.name)
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    return (
        <div>
            <div>Login</div>
            <input type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}></input>
            <input type="text" name="password" value={loginData.password} onChange={e => handleInputChange(e)}></input>
            <input type="submit" name="submit" value="submit" onClick={()=>onClickSubmit()}></input>
        </div>

    )
}


export default Login