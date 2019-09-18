import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { initLoginCreator } from '../../actions/action'
import { AppState } from '../../store'
import { RouteComponentProps, withRouter, Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { auth } from '../../firebase/firebase'
import Button from '../../designSystem/Button';
import styled from 'styled-components'
import setting from '../../designSystem/setting'


type historyProps = RouteComponentProps

const StyledHeader = styled.header`
    background-color: ${setting.White};
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${setting.TextGray};
    font-weight: bold;
    font-size: ${setting.H2};
    margin-right: 16px;
    line-height: 48px;
`

const AdminHeader: React.FC<historyProps> = props => {
    const user = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const initUserData = () => dispatch(initLoginCreator())

    const handleSignOut = () => {
        auth.signOut().then(() => {
            initUserData()
        })
    }

    if (user.userId === '') {
        return (
            <Redirect to={'/admin/login'} />
        )
    }
    else
    return (
        <StyledHeader>
            <Link to="/admin/">
                <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
            </Link>
            <p>{user.nickName}版</p>
            <nav>
                <StyledLink to="/admin/">
                    トップ
                </StyledLink>
                <StyledLink to="/admin/status">
                    ランキング
                </StyledLink>
                <StyledLink to="/admin/newSystem">
                    新制度登録
                </StyledLink>
                <StyledLink to="/admin/download">
                    データ出力
                </StyledLink>
            </nav>
            <Button link onClick={() => handleSignOut()}>サインアウト</Button>
        </StyledHeader>
    )

}

export default withRouter<historyProps, React.FC<historyProps>>(AdminHeader) 
