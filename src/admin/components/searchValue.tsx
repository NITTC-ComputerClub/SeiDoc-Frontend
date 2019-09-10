import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'

type historyProps = RouteComponentProps

const SearchValue: React.FC<historyProps> = (props) => {
    const tag = parse(props.location.search).tag as string
    const inputValue = parse(props.location.search).value as string
    if (tag !== undefined && inputValue !== undefined) {
        return (<h2>「{inputValue}」の検索結果</h2>)
    }
    else if (tag !== undefined && inputValue === undefined) {
        return (<h2>「{tag}」の検索結果</h2>)
    }
    else {
        return (<div></div>)
    }
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchValue)