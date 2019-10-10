import React, { useEffect } from 'react';
import { Redirect } from 'react-router'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import CategoryCardsList from '../../user/components/categoryCardsList'
import PopularSystemList from '../components/popularSystemList'
import { Link } from 'react-router-dom'
import SearchWords from '../components/searchWords'
import { Container, MainContents, Wrapper } from '../../designSystem/Page';
import AdminSearch from '../components/adminSearch';
import { useSelector, useDispatch } from 'react-redux';
import { AppState } from '../../store';
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import { deleteTagCreator } from '../../actions/action'

const Detail = styled(Link)`
    color: ${setting.ThemeBlue};
`

const Top: React.FC = () => {
    const user = useSelector((state: AppState) => state.userState)
    const dispatch = useDispatch()

    useEffect(() => {
        const deleteTag = () => dispatch(deleteTagCreator())
        deleteTag()
        console.log('tag init')
    },[dispatch])

    if (!user.isAdmin) {
        console.log("not Admin")
        return (
            <Redirect to={'/admin/login'} />
        )
    }
    else
    return (
        <Wrapper>
            <Header top />
            <Container>
                <MainContents>
                    <AdminSearch />
                    <h2>カテゴリ別の閲覧状況</h2>
                    <CategoryCardsList pushTo="/admin/categoryRanking" />
                    <h2>一か月以内によく見られている制度</h2>
                    <PopularSystemList />
                    <Detail to="/admin/totalRanking">> さらに詳しく</Detail>
                    <h2>最近の検索ワード</h2>
                    <SearchWords />
                </MainContents>
            </Container>
            <Footer />
        </Wrapper>
    )
}

export default Top