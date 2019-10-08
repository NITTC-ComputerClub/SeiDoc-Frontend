import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { tmpLoginDataType, UserState } from '../../types/type';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { loginCreator } from '../../actions/action';
import { auth, fireStore } from '../../firebase/firebase';
import Button from '../../designSystem/Button';
import TextField from '../../user/components/TextField';
import styled from 'styled-components';

type historyProps = RouteComponentProps

const SignIn = styled.div`
    padding: 0 32px;
`

const StyledDiv = styled.div`
    margin-top: 32px;

    display: flex;
    button {
        margin: 0 0 0 auto;
    }
`

const SignInForm: React.FC<historyProps> = (props) => {
    let [loginData, setLoginData] = useState<tmpLoginDataType>({ email: '', password:''})
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
                        userData = Object.assign({}, userData, {
                            userId: userData.userId
                        }, doc.data());
                        console.log('userData', userData);
                        login(userData);
                        if(tmpUserState.isAdmin === true){
                            console.log("Welcome, Admin");   
                            props.history.push('/admin/'); 
                        }else{
                            console.log("this user is not admin");
                            alert('職員用アカウントではありません')
                            props.history.push('/'); 
                        }
                    }else{
                        console.log("No such Document!");
                        console.log("エラーが発生しました。管理者にお尋ねください。") //登録されてるけどユーザー情報がないとき
                    }
                }
            ).catch(err => {
                console.error('user情報の取得に失敗しました', err)
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
        <SignIn>
            <TextField
                label="ID"
                width="100%"
                type="text"
                name="email"
                value={loginData.email}
                onChange={e => handleInputChange(e)}
            />
            <TextField
                label="パスワード"
                width="100%"
                type="password"
                name="password"
                value={loginData.password}
                onChange={e => handleInputChange(e)}
                onKeyDown={e => {
                    if (e.keyCode === 13) {
                        handleSignIn();
                    }
                }}
            />
            <StyledDiv>
                <Button blue onClick={() => handleSignIn()}>ログイン</Button>
            </StyledDiv>
        </SignIn>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignInForm)