import React from 'react'
import SearchBar from '../components/searchBar'
import Tag from '../components/tag'
import SystemList from '../components/systemList'
import '../scss/result.scss'

const Result: React.FC = () => {
    return (
        <div className="result">
            <div className="container">
                <SearchBar />
            </div>
            <Tag />
            <h3>検索結果</h3>
            <SystemList />
        </div>
    )
}

export default Result