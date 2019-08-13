import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'
import { withRouter, RouteComponentProps } from 'react-router'
import '../scss/searchBar.scss'

type historyProps = RouteComponentProps

const SearchBar: React.FC<historyProps> = (props) => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    let inputValue: string = ''
    return (
        <div className="searchBar">
            <input type="text" onChange={e => {
                inputValue = e.target.value
            }} placeholder="「未熟児」などの単語を入力" />
            <button onClick={() => {
                props.history.push('/search?tag=' + tag + '&value=' + inputValue)
            }}>
                <img src="img/虫眼鏡.png" alt="虫眼鏡"></img>
            </button>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchBar)