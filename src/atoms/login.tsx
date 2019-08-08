import React, {useState} from 'react'
import  { auth } from '../firebase/firebase'
import firebase from 'firebase'

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
            </div>
        }   
        </div>
    )
}


export default Login