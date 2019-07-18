import * as React from 'react'
import { TagsState } from '../reducers/tagsReducer'
import { searchBarActions } from '../containers/searchBarContainer'

type searchBarProps = TagsState & searchBarActions;

const SearchBar: React.FC<searchBarProps> = (props: searchBarProps) => {
    let inputValue :string = ''
    return (
        <div>
            <div>
                <input type="text" onChange={e=> {inputValue = e.target.value}}/> 
                <button onClick={() => {props.fetchSystemByAlgoliaSearch(inputValue, props.tags)}}>クリック</button>
            </div>
        </div>
    )
}

export default SearchBar