import * as React from 'react'
import SearchBar from '../components/searchBar'
//import CategoryButton from '../components/categoryButton'
import CategoryButton from '../containers/categorysContainer'

const Category: React.FC = () => {
    return (
        <div>
            <SearchBar />
            <CategoryButton />
        </div>
    )
}

export default Category