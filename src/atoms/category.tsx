import * as React from 'react'
import SearchBar from '../containers/searchBarContainer'
import CategoryButton from '../containers/categorysContainer'

const Category: React.FC = () => {
    return (
        <div>
            <SearchBar />
            <h2>カテゴリー</h2>
            <CategoryButton />
        </div>
    )
}

export default Category