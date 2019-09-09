import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import Header from '../components/header'
import Footer from '../../components/footer-pc'
import CategoryCardsList from '../../components/categoryCardsList'
import { Container, MainContents } from '../../designSystem/Page';
type historyProps = RouteComponentProps;

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