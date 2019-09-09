import React from 'react'
import Tag from '../../user/components/tag'
import AdminSystemList from '../components/adminSystemList'
import Footer from '../../user/components/footer'
import Header from '../components/header'

const Search: React.FC = () => {
    return (
        <div>
            <Header />
            <div className="result">
                <div className="container">
                </div>
                <Tag pushTo="/admin/category" />
                <h3>検索結果</h3>
                <AdminSystemList />
            </div>
            <Footer />
        </div>
    )
}

export default Search