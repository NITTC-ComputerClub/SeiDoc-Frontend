import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/searchBar';
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
            <nav>
                <StyledLink to="/">
                    制度一覧
                </StyledLink>
                <StyledLink to="/">
                    新制度登録
                </StyledLink>
                <StyledLink to="/">
                    制度閲覧状況
                </StyledLink>
            </nav>
            <SearchBar
                pushTo="/admin/search"
                right
            />
        </StyledHeader>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminHeader) 
