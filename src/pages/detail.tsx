import * as React from 'react'
import DetailList from '../components/detailList'
import { RouteComponentProps } from 'react-router'
import "../scss/detail.scss"

type historyProps = RouteComponentProps

const Detail: React.FC<historyProps> = (props: historyProps) => {
    console.log(props.match.params)
    return (
        <DetailList />
    )
}

export default Detail