import React, { useEffect } from 'react';
import SearchBar from '../components/searchBar'
import CategoryButton from '../components/categoryButton'
import { useDispatch } from 'react-redux'
import { deleteTagCreator } from '../actions/action'
import "../scss/category.scss"
import Header from '../components/header';

const Category: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const deleteTag = () => dispatch(deleteTagCreator())
        console.log('tag init')
        deleteTag()
    }, [dispatch])
    return (
        <div className="category">
            <div className="categoryContainer">
                <SearchBar />
                <h2>カテゴリー</h2>
                <CategoryButton />
            </div>
            <Header />
        </div>
    )
}

export default Category