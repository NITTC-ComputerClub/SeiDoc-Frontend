import * as React from 'react'
import SearchBar from '../containers/searchBarContainer'
import Tags from '../containers/tagsContainer'
import SystemList from '../containers/systemListContainer'

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