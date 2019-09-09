import React from 'react'
import Tag from '../../user/components/tag'
import AdminSystemList from '../components/adminSystemList'
import Footer from '../../user/components/footer'
import Header from '../components/header'
import { Container, MainContents } from '../../designSystem/Page'
import styled from 'styled-components';
import setting from '../../designSystem/setting';

const Title = styled.h1`
    font-size: ${setting.H1};
`

const ListWrapper = styled.div`
    margin-top: 16px;
`

const Search: React.FC = () => {
    return (
        <div>
            <Header />
            <Container>
                <MainContents>
                    {/* 全文検索時のみh1タグ表示 */}
                    <Title>「子育て」の検索結果</Title>
                    <Tag pushTo="/admin/category" />
                    <ListWrapper>
                        <AdminSystemList />
                    </ListWrapper>
                </MainContents>
            </Container>
            <Footer />
        </div>
    )
}

export default Search