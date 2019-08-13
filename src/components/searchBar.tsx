import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { fetchSystemByAlgoliaSearch, addTagCreator } from '../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import '../scss/searchBar.scss'

type historyProps = RouteComponentProps

const SearchBar: React.FC<historyProps> = (props) => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    const dispatch = useDispatch()
    const alogliaSearch = (query: string, category: string) => dispatch(fetchSystemByAlgoliaSearch(query, category))
    const addTag = (newtag: string) => dispatch(addTagCreator(newtag))
    let inputValue: string = ''
    return (
        <div className="searchBar">
            <input type="text" onChange={e => { inputValue = e.target.value }} placeholder="「未熟児」などの単語を入力" />
            <button onClick={() => {
                alogliaSearch(inputValue, tag)
                addTag(inputValue)
                props.history.push('/result')
            }}>
                <img src="img/虫眼鏡.png" alt="虫眼鏡"></img>
            </button>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchBar)