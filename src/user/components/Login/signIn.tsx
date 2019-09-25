import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginCreator } from '../../../actions/action'
import { AppState } from '../../../store'
import { auth, fireStore } from '../../../firebase/firebase'
import firebase from 'firebase'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { loginDataType, UserState } from '../../../types/type';
import Button from '../../../designSystem/Button';
import TextField from '../TextField';
import styled from 'styled-components';

type historyProps = RouteComponentProps

const StyledSignIn = styled.div`
    padding: 0 32px;
`

const StyledDiv = styled.div`
    margin-top: 32px;

    display: flex;
    button {
        margin: 0 0 0 auto;
    }
`

const SignIn: React.FC<historyProps> = (props) => {
    let [loginData, setLoginData] = useState<loginDataType>({ email: '', password: '' })
    let userData = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))
    const handleSignIn = () => {
        const email = loginData.email
        const password = loginData.password
        auth.signInWithEmailAndPassword(email, password).then(res => {
            const user = res.user as firebase.User
            userData['userId'] = user.uid
        }).then(() => {
            fireStore.collection('user').doc(userData.userId).get()
                .then((doc) => {
                    if (doc.exists) {
                        userData = Object.assign({}, userData, {
                            userId: userData.userId
                        }, doc.data())
                        console.log('userData', userData)
                        login(userData)
                    }
                    else {
                        console.log("No such document!");
                    }
                }).then(() => {
                    props.history.push('/')
                }).catch((error) => {
                    console.log(error)
                })
        }).catch((error) => {
            const errorCode = error.code
            if (errorCode === 'auth/wrong-password') {
                alert('ユーザー名もしくはパスワードが間違っています。<password>') //<>内はデバッグ用です
            } else {
                alert('ユーザー名もしくはパスワードが間違っています。<username>')
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
        <StyledSignIn>
            <TextField label="メールアドレス" width="100%" type="text" name="email" value={loginData.email} onChange={e => handleInputChange(e)}/>
            <TextField label="パスワード" width="100%" type="password" name="password" value={loginData.password} onChange={e => handleInputChange(e)}/>
            <StyledDiv className="lrContents">
                <Link to='signup'><Button link>登録はこちらから</Button></Link>
                <Button blue onClick={() => handleSignIn()}>
                    ログイン
                </Button>
            </StyledDiv>
        </StyledSignIn>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignIn)
