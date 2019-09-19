import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import CategoryCardsList from '../../user/components/categoryCardsList'
import PopularSystemList from '../components/popularSystemList'
import { Link } from 'react-router-dom'
import SearchWords from '../components/searchWords'
import { Container, MainContents } from '../../designSystem/Page';
import AdminSearch from '../components/adminSearch';

type historyProps = RouteComponentProps

const Search: React.FC<historyProps> = props => {
    return (
        <div>
            <Header top />
            <Container>
                <MainContents>
                    <AdminSearch></AdminSearch>
                    <h2>カテゴリ別の閲覧状況</h2>
                    <CategoryCardsList pc pushTo="/admin/status" />
                    <h2>一か月以内によく見られている制度</h2>
                    <PopularSystemList />
                    <Link to="/admin/">> さらに詳しく</Link>
                    <h2>最近の検索ワード</h2>
                    <SearchWords />
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Search)