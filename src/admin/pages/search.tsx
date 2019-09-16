import React from 'react'
import AdminSystemList from '../components/adminSystemList'
import Footer from '../../user/components/footer'
import Header from '../components/header'
import SearchBar from '../../user/components/searchBar'
import CategoryCardsList from '../../user/components/categoryCardsList'

const Search: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="result">
                <div className="container">
                </div>
                <SearchBar pushTo='/admin/search'/>
                <CategoryCardsList pc pushTo='/admin/search'/>
                <h2>検索結果</h2>
                <AdminSystemList />
            </div>
            <Footer />
        </div>
    )
}

export default Search