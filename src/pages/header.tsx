import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initLoginCreator } from '../actions/action'
import { AppState } from '../store'
import { withRouter, RouteComponentProps } from 'react-router'
import { auth } from '../firebase/firebase'
import "../scss/header.scss"

type historyProps = RouteComponentProps

const Header: React.FC<historyProps> = (props) => {
    const user = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const initUserData = () => dispatch(initLoginCreator())

    const handleSignOut = () => {
        auth.signOut().then(() => {
            initUserData()
        })
    }
    if (user.userId === '') {    //ログインしてない場合
        return (
            <header>
                <button onClick={() => { props.history.push('/login') }}>ログイン/新規登録</button>
            </header>
        )
    }
    else {
        return (
            <header>
                <p>ようこそ{user.nickName}さん</p>
                <button onClick={() => handleSignOut()}>サインアウト</button>
            </header>
            )
        }
    }
    
export default withRouter<historyProps, React.FC<historyProps>>(Header)