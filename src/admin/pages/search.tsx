import React from 'react'
import Tag from '../../user/components/tag'
import AdminSystemList from '../components/adminSystemList'
import Footer from '../../user/components/footer'
import Header from '../components/header'
import SearchValue from '../components/searchValue'

const Search: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="result">
                <div className="container">
                </div>
                <SearchValue />
                <Tag pushTo="/admin/category" />
                <AdminSystemList />
            </div>
            <Footer />
        </div>
    )
}

export default Search