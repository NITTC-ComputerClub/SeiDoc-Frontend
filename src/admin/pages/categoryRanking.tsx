import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

type historyProps = RouteComponentProps

const CategoryRanking: React.FC<historyProps> = props => {
    return (
        <div>

        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(CategoryRanking)