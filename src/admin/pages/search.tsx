import React from 'react'
import AdminSystemList from '../components/adminSystemList'
import Footer from '../../user/components/footer'
import Header from '../components/header'
import { Container, MainContents } from '../../designSystem/Page';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

const Title = styled.h1`
    font-size: ${setting.H1};
    margin-top: 32px;
`

const Search: React.FC = () => {
    return (
        <div>
            <Header />
            <Container>
                <MainContents>
                    <Title>検索結果</Title>
                    <AdminSystemList />
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}

export default Search