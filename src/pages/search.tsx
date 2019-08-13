import React from 'react'
import SearchBar from '../components/searchBar'
import Tag from '../components/tag'
import SystemList from '../components/systemList'
import '../scss/result.scss'
import Header from '../components/footer';

const Search: React.FC = () => {
    return (
        <div>
            <div className="result">
                <div className="container">
                    <SearchBar />
                </div>
                <Tag />
                <h3>検索結果</h3>
                <SystemList />
            </div>
            <Header />
        </div>
    )
}

export default Search