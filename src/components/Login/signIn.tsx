import React, { useState } from 'react'
import { auth } from '../../firebase/firebase'
import firebase from 'firebase'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

type loginData = {
    email: string,
    password: string
}

const SignIn: React.FC<historyProps> = (props: historyProps) => {
    let [loginData, setLoginData] = useState<loginData>({ email: '', password: '' })

    const handleSignIn = () => {
        const email = loginData.email
        const password = loginData.password
        auth.signInWithEmailAndPassword(email, password).then(res => {
            const user = res.user as firebase.User
            console.log(user.uid)
        }).then(() => {
            /* TODO:トップページに遷移 */
            props.history.push('/')
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password')
            } else {
                alert(errorMessage)
            }
            console.log(error)
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    return (
        <div>
            <p>メールアドレス</p>
            <input type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}></input>
            <p>パスワード</p>
            <input type="text" name="password" value={loginData.password} onChange={e => handleInputChange(e)}></input>
            <button onClick={() => handleSignIn()}>ログイン</button>
        </div>
    )
}


export default withRouter<historyProps, React.FC<historyProps>>(SignIn)