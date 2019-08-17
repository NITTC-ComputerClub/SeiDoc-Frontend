import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import "../../scss/popularSystemCard.scss"

type historyProps = RouteComponentProps
type params = {
    systemName: string,
    systemLocation: string,
    documentId: string
}
type propsType = historyProps & params

const PopularSystemCard: React.FC<propsType> = (props) => {
    return (
        <li className="popularSystemCard" onClick={() => props.history.push('/detail/' + props.documentId)}>
            <h4>{props.systemName}</h4>
            <p>{props.systemLocation}</p>
        </li>
    )
}

export default withRouter<propsType, React.FC<propsType>>(PopularSystemCard)