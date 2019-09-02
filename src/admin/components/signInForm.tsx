import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { loginDataType, UserState } from '../../types/type';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { loginCreator } from '../../actions/action';
import { auth, fireStore } from '../../firebase/firebase';

type historyProps = RouteComponentProps
const SignInForm: React.FC<historyProps> = (props) => {
    let [loginData, setLoginData] = useState<loginDataType>({ email: '', password:''})
    let userData = useSelector((state: AppState) => state.userState);
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))
    const handleSignIn = () => {
        const email = loginData.email
        const password = loginData.password
        auth.signInWithEmailAndPassword(email, password).then(res => {
            const user = res.user as firebase.User
            userData['userId'] = user.uid
        }).then(() => {
            fireStore.collection('user').doc(userData.userId).get().then(
                doc => {
                    if(doc.exists){
                        const tmpUserState = doc.data() as UserState
                        if(tmpUserState.isAdmin === undefined){
                            console.log("this user is not admin");
                        }else{
                            console.log("Welcome, Admin");
                        }
                    }else{
                        console.log("No such Document!");
                    }
                }
            ).then(()=>{
                props.history.push('/'); // TODO: どこに飛ばす?
            }).catch(err => {
                console.error(err)
            })
        }).catch(err => {
            const errorCode = err.code
            const errorMessage = err.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password')
            } else {
                alert(errorMessage)
            }
        })
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name as 'email' | 'password'
        loginData[name] = e.target.value
        setLoginData(Object.assign({}, loginData))
    }

    return (
        <div className="signIn">
            <p>ID</p>
            <input type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}/>
            <p>パスワード</p>
            <input type="password" name="password" value={loginData.password} onChange={e => handleInputChange(e)}/>
            <div className="lrContents">
                <button onClick={() => handleSignIn()}>ログイン</button>
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignInForm)