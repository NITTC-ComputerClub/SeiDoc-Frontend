import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initLoginCreator } from '../../actions/action'
import { AppState } from '../../store'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import Button from '../../designSystem/Button';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

type historyProps = RouteComponentProps

const StyledHeader = styled.header`
    padding: 8px 16px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    p {
        margin: 0 auto 0 0;
        font-size: ${setting.P3};
        margin-top: 8px;
    }

    a {
        grid-column-start: 2;
        grid-column-end: 3;
        text-align: center;
    }

    img {
        height: 32px;
    }

    button {
        margin: 0 0 0 auto;
        grid-column-start: 3;
        grid-column-end: 4;
    }
`

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
            <StyledHeader>
                <Link to="/">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                </Link>
                <Button link onClick={() => { props.history.push('/login') }}>ログイン/新規登録</Button>
            </StyledHeader>
        )
    }
    else {
        return (
            <StyledHeader>
                <p>ようこそ{user.nickName}さん</p>
                <Link to="/">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                </Link>
                <Button link onClick={() => handleSignOut()}>サインアウト</Button>
            </StyledHeader>
        )
    }
}

export default withRouter<historyProps, React.FC<historyProps>>(Header)