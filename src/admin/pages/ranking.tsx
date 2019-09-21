import React from 'react'
import Header from '../components/header'
import Footer from '../../user/components/footer'
import CategoryCardsList from '../../user/components/categoryCardsList'
import RankingList from '../components/rankingList'

const Ranking: React.FC = () => {
    return (
        <div>
            <Header />
            <h2>カテゴリ別の閲覧状況</h2>
            <CategoryCardsList pushTo='/admin/ranking' />
            <h2>一か月以内によく見られている制度</h2>
            <RankingList />
            <Footer />
        </div>
    )
}

export default Ranking