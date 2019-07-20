import * as React from 'react'
import SearchBar from '../components/searchBar'
import Tags from '../components/tags'
import SystemList from '../components/systemList'

const Result: React.FC = () => {
    return (
        <div>
            <SearchBar />
            <h3>検索結果</h3>
            <Tags />
            <SystemList />
        </div>
    )
}

export default Result