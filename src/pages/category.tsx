import React, { useEffect } from 'react';
import SearchBar from '../components/searchBar'
import CategoryButton from '../components/categoryButton'
import { useDispatch } from 'react-redux'
import { deleteTagCreator } from '../actions/action'
import Footer from '../components/footer';
import Header from '../pages/header'
import "../scss/category.scss"


const Category: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const deleteTag = () => dispatch(deleteTagCreator())
        console.log('tag init')
        deleteTag()
    }, [dispatch])
    return (
        <div className="category">
            <Header />
            <div className="categoryContainer">
                <SearchBar pushTo="/search" center/>
                <h2>カテゴリー</h2>
                <CategoryButton pushTo="/search"/>
            </div>
            <Footer />
        </div>
    )
}

export default Category