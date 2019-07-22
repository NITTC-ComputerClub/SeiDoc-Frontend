import React, { useEffect } from 'react';
import SearchBar from '../components/searchBar'
import CategoryButton from '../components/categoryButton'
import { useDispatch } from 'react-redux'
import { deleteTagCreator } from '../actions/action'

const Category: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const deleteTag = () => dispatch(deleteTagCreator())
        console.log('tag init')
        deleteTag()
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