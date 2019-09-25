import React from 'react'
import AdminSystemList from '../components/adminSystemList'
import Footer from '../../user/components/footer'
import Header from '../components/header'
import AdminSearch from '../components/adminSearch';
import { Wrapper } from '../../designSystem/Page';
import { Container, MainContents } from '../../designSystem/Page';
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import { Redirect } from 'react-router';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

const Title = styled.h1`
    font-size: ${setting.H1};
    margin-top: 32px;
`

const Search: React.FC = () => {
    const user = useSelector((state: AppState) => state.userState)
    if (user.userId === '') {
        return (
            <Redirect to={'/admin/login'} />
        )
    }
    else
    return (
        <Wrapper>
            <Header />
            <Container>
                <MainContents>
                    <AdminSearch />
                    <Title>検索結果</Title>
                    <AdminSystemList />
                </MainContents>
            </Container>
            <Footer />
        </Wrapper>
    )
}

export default Search