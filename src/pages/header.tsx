import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const Header: React.FC<historyProps> = (props) => {
    const user = useSelector((state: AppState) => state.userState)
    console.log('uid:', user.userId)
    if (user.userId === '') {    //ログインしてない場合
        return (
            <div>
                <button onClick={() => { props.history.push('/login') }}>ログイン/新規登録</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>ようこそ{user.nickName}さん</p>
                <button onClick={() => { console.log('ログアウト処理') }}>サインアウト</button>
            </div>
            )
        }
    }
    
export default withRouter<historyProps, React.FC<historyProps>>(Header)