import React, {useState} from 'react'
import { auth } from '../firebase/firebase'

type loginData = {
    email: string,
    password: string
}
const Login: React.FC = () => {
    let [loginData, setLoginData] = useState<loginData>({email: '',password:''})

    const handleSignUp = () => {
        const email = loginData.email
        const password = loginData.password
        console.log(email)
        console.log(password)
        
        if (password.length < 8) {
            alert('Please enter a password')
            return
        }

        auth.createUserWithEmailAndPassword(email, password).then(res => {
            console.log(res)
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            if(errorCode === 'auth/weak-password') {
                alert('The password is too weak.')
            } else {
                alert(errorMessage)
            }
            console.log(error)
        })
    }

    const handleSignIn = () => {
        console.log('Sign in!')
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    return (
        <div>
            <div>新規登録</div>
            <input type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}></input>
            <input type="text" name="password" value={loginData.password} onChange={e => handleInputChange(e)}></input>
            <input type="submit" name="submit" value="submit" onClick={()=>handleSignUp()}></input>
            <br></br>
            <div>ログイン</div>
            <input type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}></input>
            <input type="text" name="password" value={loginData.password} onChange={e => handleInputChange(e)}></input>
            <input type="submit" name="submit" value="submit" onClick={()=>handleSignIn()}></input>
        
        </div>

    )
}


export default Login