import React, {useState} from 'react'
import  { fireStore, auth } from '../firebase/firebase'
import firebase from 'firebase'

type loginData = {
    email: string,
    password: string
}
type userData = {
    birthday: string,
    income: number,
    address: string,
    family: string
}

const Login: React.FC = () => {
    let [loginData, setLoginData] = useState<loginData>({email: '',password:''})
    let [userData, setUserData] = useState<userData>({birthday: '',income: 0, address: '',family: ''})

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
            console.log(user.uid)

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
        const email = loginData.email
        const password = loginData.password
        auth.signInWithEmailAndPassword(email, password).then(res => {
            const user = res.user as firebase.User
            console.log(user.uid)
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

    const handleSignOut = () => {
        auth.signOut()
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    const handleUserdataInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'birthday' |  'address' | 'family' 
        userData[name] = e.target.value
        setUserData(Object.assign({}, userData))
    }

    const handleSetUserdata = () => {
        const user = auth.currentUser as firebase.User
        fireStore.collection('user').doc(user.uid).set(userData).then(res => {
            console.log(user.uid)
        })
    }

    return (
        <div>
        {!auth.currentUser?
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

            </div>:
            <div>
                <div>ようこそ、{auth.currentUser.uid}</div>
                <input type="submit" name="submit" value="SignOut" onClick={()=>handleSignOut()}></input>

                <div>生年月日</div>
                    <input type="date" name="birthday" value={userData.birthday} onChange={e => handleUserdataInputChange(e)}></input>
                <div>年収</div>
                    <input type="number" name="income" value={userData.income} onChange={e => handleUserdataInputChange(e)}></input>
                <div>居住区</div>
                    <input type="text" name="address" value={userData.address} onChange={e => handleUserdataInputChange(e)}></input>
                <div>家族構成</div>
                    <input type="text" name="family" value={userData.family} onChange={e => handleUserdataInputChange(e)}></input>
                <input type="submit" name="submit" value="submit" onClick={() => handleSetUserdata()}></input>
            </div>
        }   
        </div>
    )
}


export default Login