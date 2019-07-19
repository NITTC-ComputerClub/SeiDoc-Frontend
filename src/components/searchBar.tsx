import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByAlgoliaSearch } from '../actions/action'

const SearchBar: React.FC = () => {
    const tags = useSelector((state: AppState) => state.tags.tags)
    const dispatch = useDispatch()
    const alogliaSearch = (query: string, category: Array<string>) => dispatch(fetchSystemByAlgoliaSearch(query, category))
    let inputValue: string = ''
    return (
        <div>
            <div>
                <input type="text" onChange={e => { inputValue = e.target.value }} />
                <button onClick={() => { alogliaSearch(inputValue, tags) }}>クリック</button>
            </div>
        </div>
    )
}

export default SearchBar