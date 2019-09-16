import React, { useEffect } from 'react';
import SearchBar from '../components/searchBar'
import CategoryCardsList from '../components/categoryCardsList'
import { useDispatch } from 'react-redux'
import { deleteTagCreator, deleteSystemsCreator } from '../../actions/action'
import Footer from '../components/footer';
import Header from '../components/header'
import styled from 'styled-components';
import setting from '../../designSystem/setting';
import { Wrapper } from '../../designSystem/Page';

const CategoryContainer = styled.div`
    padding: 16px;
    margin-bottom: 8px;

    background-color: ${setting.White};
`

const Category: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const deleteTag = () => dispatch(deleteTagCreator())
        const deleteSystems = () => dispatch(deleteSystemsCreator())
        console.log('tag & systems init')
        deleteTag()
        deleteSystems()
    }, [dispatch])
    return (
        <Wrapper>
            <Header />
            <CategoryContainer>
                <SearchBar pushTo="/search" center />
                <h2>カテゴリー</h2>
                <CategoryCardsList pushTo="/search" />
            </CategoryContainer>
            <Footer />
        </Wrapper>
    )
}

export default Category