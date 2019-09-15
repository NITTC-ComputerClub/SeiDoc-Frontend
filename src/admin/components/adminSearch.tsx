import React from 'react';
import { RouteComponentProps, withRouter } from "react-router";
import CategoryCardsList from '../../user/components/categoryCardsList'
import SearchBar from '../../user/components/searchBar'
import styled from 'styled-components';

type historyProps = RouteComponentProps

const StyledAdminSearch = styled.div`
    margin-top: 32px;
`

const AdminSearch: React.FC<historyProps> = props => {
    return (
        <StyledAdminSearch>
            <SearchBar center pushTo="/admin/search" />
            <CategoryCardsList pc pushTo="/admin/search" />
        </StyledAdminSearch>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminSearch)