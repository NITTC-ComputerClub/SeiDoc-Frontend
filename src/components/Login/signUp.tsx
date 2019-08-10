import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginCreator } from '../../actions/action'
import { UserState } from '../../reducers/loginReducer'
import { AppState } from '../../store'
import { fireStore, auth } from '../../firebase/firebase'
import firebase from 'firebase'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

type loginData = {
    email: string,
    password: string
}

const SignUp: React.FC<historyProps> = (props: historyProps) => {
    let [loginData, setLoginData] = useState<loginData>({ email: '', password: '' })
    const dispatch = useDispatch()
    const userData = useSelector((state: AppState) => state.userState)
    const login = (data: UserState) => dispatch(loginCreator(data))

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
            const user = res.user as firebase.User
            userData['userId'] = user.uid
        }).then(() => {
            handleSetUserdata()
            login(userData)
        }).catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            if (errorCode === 'auth/weak-password') {
                alert('The password is too weak.')
            } else {
                alert(errorMessage)
            }
            console.log(error)
        })
    }

    const handleUserdataInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'birthday' | 'address' | 'family'
        userData[name] = e.target.value
        console.log('userData', userData)
    }

    const handleSetUserdata = () => {
        const uid = userData.userId
        const sendData = userData
        delete sendData.userId
        fireStore.collection('user').doc(uid).set(sendData).then(res => {
            console.log('set firebase', uid)
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    return (
        <div>
            <div>新規登録</div>
            <p>メールアドレス</p>
            <input type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}></input>
            <p>パスワード</p>
            <input type="text" name="password" onChange={e => handleInputChange(e)}></input>
            <p>生年月日</p>
            <input type="date" name="birthday" onChange={e => handleUserdataInputChange(e)}></input>
            <p>年収</p>
            <input type="number" name="income" onChange={e => handleUserdataInputChange(e)}></input>
            <p>居住区</p>
            <input type="text" name="address" onChange={e => handleUserdataInputChange(e)}></input>
            <p>家族構成</p>
            <input type="text" name="family" onChange={e => handleUserdataInputChange(e)}></input>
            <button onClick={() => handleSignUp()}>登録</button>
        </div>
    )
}


export default withRouter<historyProps, React.FC<historyProps>>(SignUp)