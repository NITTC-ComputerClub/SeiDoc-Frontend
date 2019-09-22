import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'

type historyProps = RouteComponentProps

const SearchValue: React.FC<historyProps> = (props) => {
    const tag = parse(props.location.search).tag as string
    if (tag !== undefined ) {
        return (<h2>一か月以内によく見られている「{tag}」制度</h2>)
    }
    else {
        return (<div></div>)
    }
}

export default withRouter<historyProps, React.FC<historyProps>>(SearchValue)