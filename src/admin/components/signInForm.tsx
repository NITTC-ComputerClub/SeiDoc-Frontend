import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from "react-router";
import { loginDataType, UserState } from '../../types/type';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import { loginCreator } from '../../actions/action';
import { auth, fireStore } from '../../firebase/firebase';
import Button from '../../designSystem/Button';
import TextField from '../../components/TextField';
import styled from 'styled-components';

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
                        userData = Object.assign({}, userData, {
                            userId: userData.userId
                        }, doc.data());
                        console.log('userData', userData);
                        login(userData);
                        if(tmpUserState.isAdmin === true){
                            console.log("Welcome, Admin");   
                            props.history.push('/'); // TODO: 職員用のtopに飛ばす
                        }else{
                            console.log("this user is not admin");
                            props.history.push('/'); // TODO: 職員用アカウントではないことを表示し、普通の画面に遷移？
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

    const StyledDiv = styled.div`
        margin-top: 32px;
    `

    return (
        <div className="signIn">
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
            />
            <StyledDiv className="lrContents">
                <Button blue onClick={() => handleSignIn()}>ログイン</Button>
            </StyledDiv>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignInForm)