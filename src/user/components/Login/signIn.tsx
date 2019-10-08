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

type adminProps = {
    admin?: boolean
}

type historyProps = RouteComponentProps & adminProps

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
    let [loginData, setLoginData] = useState<loginDataType>({ email: { data: '', message: null, status: false }, password: { data: '', message: null, status: false } })
    let userData = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const login = (data: UserState) => dispatch(loginCreator(data))
    const handleSignIn = () => {
        const email = loginData.email
        const password = loginData.password
        auth.signInWithEmailAndPassword(email.data, password.data).then(res => {
            const user = res.user as firebase.User
            userData['userId'] = user.uid
        }).then(() => {
            fireStore.collection('user').doc(userData.userId).get()
                .then((doc) => {
                    if (doc.exists) {
                        const tmpUserState = doc.data() as UserState
                        userData = Object.assign({}, userData, {
                            userId: userData.userId
                        }, doc.data())
                        console.log('userData', userData)
                        login(userData)
                        if (props.admin) {
                            if (tmpUserState.isAdmin) {
                                console.log("Welcome, Admin")
                            } else {
                                console.log("This user is not admin")
                                alert('職員用アカウントではありません')
                            }
                        }
                    }
                    else {
                        console.log("No such document!");
                    }
                }).then(() => {
                    props.admin ? props.history.push('/admin/') : props.history.push('/')
                }).catch((error) => {
                    console.log(error)
                })
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
        const type = e.target.name as 'email' | 'password'
        switch (type) {
            case 'email':
                loginData.email.data = e.target.value
                if (e.target.validationMessage) {
                    loginData.email.message = e.target.validationMessage
                    loginData.email.status = false
                }
                else {
                    loginData.email.message = null
                    loginData.email.status = true
                }
                break
            case 'password':
                loginData.password.data = e.target.value
                if (e.target.validationMessage) {
                    loginData.password.message = e.target.validationMessage
                    loginData.password.status = false
                }
                else {
                    loginData.password.message = null
                    loginData.password.status = true
                }
                break
        }
        setLoginData(Object.assign({}, loginData))
    }

    return (
        <StyledSignIn>
            <TextField label="メールアドレス" width="100%" type="email" name="email" value={loginData.email.data} onChange={e => handleInputChange(e)} required />
            <p>{loginData.email.message}</p>
            <TextField label="パスワード" width="100%" type="password" name="password" value={loginData.password.data}
                onChange={e => handleInputChange(e)}
                onKeyDown={e => {
                    if (e.keyCode === 13) {
                        handleSignIn();
                    }
                }}
                required
            />
            <p>{loginData.password.message}</p>
            <StyledDiv className="lrContents">
                <Link to='signup'><Button link>登録はこちらから</Button></Link>
                <Button blue disabled={loginData.email.status === false || loginData.password.status === false} onClick={() => handleSignIn()} >
                    ログイン
                </Button>
            </StyledDiv>
        </StyledSignIn>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignIn)
