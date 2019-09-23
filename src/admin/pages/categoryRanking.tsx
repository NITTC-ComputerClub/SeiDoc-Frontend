import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import Header from '../components/header'
import CategoryCardsList from '../../user/components/categoryCardsList'
import SearchValue from '../components/searchValue'
import CategoryRankingList from '../components/categoryRankingList'
import Footer from '../../user/components/footer'

type historyProps = RouteComponentProps

const CategoryRanking: React.FC<historyProps> = props => {
    return (
        <div>
            <Header />
            <h2>カテゴリ別の制度閲覧状況</h2>
            <CategoryCardsList pushTo='/admin/categoryRanking' />
            <SearchValue />
            <CategoryRankingList />
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(CategoryRanking)