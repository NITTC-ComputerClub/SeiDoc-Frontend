import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Header from '../components/header'
import Footer from '../../components/footer-pc'
import CategoryCardsList from '../../components/categoryCardsList'
import styled from 'styled-components';
type historyProps = RouteComponentProps;

const MainContents = styled.div`
    box-sizing: border-box;
    margin: 0 auto;
    max-width: 960px;
`

const Container = styled.div`
    margin: 0 16px 32px 16px;
`

const Search: React.FC<historyProps> = props => {
    return(
        <div>
            <Header />
            <Container>
                <MainContents>
                    <h2>カテゴリ</h2>
                    <CategoryCardsList pc pushTo="/admin/search"/>
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Search)