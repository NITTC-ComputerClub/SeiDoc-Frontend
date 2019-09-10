import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'

type historyProps = RouteComponentProps

const SearchValue: React.FC<historyProps> = (props) => {
    const tag = parse(props.location.search).tag as string
    const inputValue = parse(props.location.search).value as string
    if (tag !== undefined && inputValue !== undefined) { //アルゴリアサーチ
        return (<h2>「{inputValue}」の検索結果</h2>)
    }
    else if (tag !== undefined && inputValue === undefined) { //タグ検索
        return (<div></div>)
    }
    else {
        return (<div></div>)
    }
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchValue)