import React, { useEffect } from 'react';
import SearchBar from '../components/searchBar'
import CategoryButton from '../components/categoryButton'
import { useDispatch } from 'react-redux'
import { deleteTagsCreator } from '../actions/action'

const Category: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const deleteTags = () => dispatch(deleteTagsCreator())
        console.log('tags init')
        deleteTags()
    }, [dispatch])
    return (
        <div>
            <SearchBar />
            <h2>カテゴリー</h2>
            <CategoryButton />
        </div>
    )
}

export default Category