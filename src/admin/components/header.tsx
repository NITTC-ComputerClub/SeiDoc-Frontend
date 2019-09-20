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
import _ from 'lodash';

type headerProps = {
    top?: boolean,
    ranking?: boolean,
    newSystem?: boolean,
    dataOutput?: boolean
}
type historyProps = RouteComponentProps & headerProps

const getHighrightNav = (props: headerProps) => {
    if (props.top) {
        return `
            .top {
                color: ${setting.ThemeGreen};
            }
        `
    }

    if (props.ranking) {
        return `
            .ranking {
                color: ${setting.ThemeGreen};
            }
        `
    }

    if (props.newSystem) {
        return `
            .newSystem {
                color: ${setting.ThemeGreen};
            }
        `
    }

    if (props.dataOutput) {
        return `
            .dataOutput {
                color: ${setting.ThemeGreen};
            }
        `
    }
}

const StyledHeader = styled.header`
    background: linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);

    display: flex;
    justify-content: flex-end;
    align-items: center;

    .right {
        margin-right: auto;
        margin-left: 24px
    }

    ul {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin-right: 24px;
    }

    img {
        height: 32px;
    }

    button {
        margin-right: 24px;
    }

    ${(props: headerProps) => getHighrightNav(props)}
`

const CityName = styled.p`
    margin-left: 8px;
    font-size: ${setting.P1};
    color: ${setting.ThemeGreen};
    background: linear-gradient(129.22deg, #44DD9D 0%, #449DDD 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    float: right;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${setting.TextGray};
    font-weight: normal;
    font-size: ${setting.H2};
    margin-right: 16px;
    line-height: 48px;
`

const AdminHeader: React.FC<historyProps> = props => {
    const user = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()
    const initUserData = () => dispatch(initLoginCreator())

    const highright = _.pick(props, ["top", "ranking", "newSystem", "dataOutput"])

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
        <StyledHeader {...highright}>
            <div className="right">
                <Link className="imgWrapper" to="/admin/">
                    <img src="/img/logoWithoutText.png" alt="SeiDocのロゴ"></img>
                </Link>
                <CityName>{user.nickName}版</CityName>
            </div>
            <nav>
                <ul>
                    <li>
                        <StyledLink className="top" to="/admin/">
                            トップ
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink className="ranking" to="/admin/status">
                            ランキング
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink className="newSystem" to="/admin/newSystem">
                            新制度登録
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink className="dataOutput" to="/admin/">
                            データ出力
                        </StyledLink>
                    </li>
                </ul>
            </nav>
            <Button link onClick={() => handleSignOut()}>サインアウト</Button>
        </StyledHeader>
    )

}

export default withRouter<historyProps, React.FC<historyProps>>(AdminHeader) 
