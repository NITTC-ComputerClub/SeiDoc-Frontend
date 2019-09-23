import React from 'react'
import Header from '../components/header'
import Footer from '../../user/components/footer'
import CategoryCardsList from '../../user/components/categoryCardsList'
import RankingList from '../components/rankingList'
import { Wrapper } from '../../designSystem/Page'

const TotalRanking: React.FC = () => {
    return (
        <div>
            <Wrapper>
                <Header ranking />
                <h2>カテゴリ別の制度閲覧状況</h2>
                <CategoryCardsList pushTo='/admin/categoryRanking' />
                <h2>一か月以内によく見られている制度</h2>
                <RankingList />
                <Footer />
            </Wrapper>
        </div>
    )
}

export default TotalRanking