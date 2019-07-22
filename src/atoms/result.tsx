import * as React from 'react'
import SearchBar from '../components/searchBar'
import Tag from '../components/tag'
import SystemList from '../components/systemList'

const Result: React.FC = () => {
    return (
        <div>
            <SearchBar />
            <h3>検索結果</h3>
            <Tag />
            <SystemList />
        </div>
    )
}

export default Result