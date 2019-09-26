import React from 'react'
import Header from '../components/header'
import CategoryCardsList from '../../user/components/categoryCardsList'
import SearchValue from '../components/searchValue'
import CategoryRankingList from '../components/categoryRankingList'
import Footer from '../../user/components/footer'
import { Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { Wrapper, MainContents } from '../../designSystem/Page'

const CategoryRanking: React.FC = () => {
    const user = useSelector((state: AppState) => state.userState)
    if (!user.isAdmin) {
        return (
            <Redirect to={'/admin/login'} />
        )
    }
    else
    return (
        <Wrapper>
            <Header />
            <MainContents>
                <h2>カテゴリ別の制度閲覧状況</h2>
                <CategoryCardsList pushTo='/admin/categoryRanking' />
                <SearchValue />
                <CategoryRankingList />
            </MainContents>
            <Footer />
        </Wrapper>
    )
}

export default CategoryRanking