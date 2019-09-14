import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import CategoryCardsList from '../../user/components/categoryCardsList'
import SearchBar from '../../user/components/searchBar'
import PopularSystemList from '../components/popularSystemList'
import SearchWords from '../components/searchWords'

type historyProps = RouteComponentProps

const Search: React.FC<historyProps> = props => {
    return (
        <div>
            <Header />
            <SearchBar pushTo="/admin/search" />
            <CategoryCardsList pc pushTo="/admin/search" />
            <h2>カテゴリ別の閲覧状況</h2>
            <CategoryCardsList pc pushTo="/admin/status" />
            <h2>一か月以内によく見られている制度</h2>
            <PopularSystemList />
            <a href="/admin/top">> さらに詳しく</a>
            <h2>最近の検索ワード</h2>
            <SearchWords />
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Search)