import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps
type params = {
    systemName: string,
    systemLocation: string
}
type propsType = historyProps & params

const PopularSystemCard: React.FC<propsType> = (props) => {
    return (
        <div>
            <li>
                <h4>{props.systemName}</h4>
                <p>{props.systemLocation}</p>
            </li>
        </div>
    )
}

export default withRouter<propsType, React.FC<propsType>>(PopularSystemCard)