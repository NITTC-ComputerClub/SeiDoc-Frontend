import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByAlgoliaSearch } from '../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const SearchBar: React.FC<historyProps> = (props: historyProps) => {
    const tags = useSelector((state: AppState) => state.tags.tags)
    const dispatch = useDispatch()
    const alogliaSearch = (query: string, category: string) => dispatch(fetchSystemByAlgoliaSearch(query, category))
    let inputValue: string = ''
    return (
        <div>
            <div>
                <input type="text" onChange={e => { inputValue = e.target.value }} />
                <button onClick={() => {
                    alogliaSearch(inputValue, tags)
                    props.history.push('/result')
                }}>クリック</button>
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchBar)