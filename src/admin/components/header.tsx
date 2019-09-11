import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
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
    return(
        <StyledHeader>
            <p>小牧市版</p>
            <nav>
                <StyledLink to="/admin/top">
                    トップ
                </StyledLink>
                <StyledLink to="/admin/status">
                    ランキング
                </StyledLink>
                <StyledLink to="/admin/newSystem">
                    新制度登録
                </StyledLink>
            </nav>
        </StyledHeader>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminHeader) 
