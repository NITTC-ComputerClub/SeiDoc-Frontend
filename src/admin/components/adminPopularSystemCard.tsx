import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router'

interface historyProps extends RouteComponentProps {
    systemName: string,
    view: number,
    group: string
}

const AdminPopularSystemCard: React.FC<historyProps> = (props) => {
    return (
        <div>
            <h3>{props.systemName}</h3>
            <p>閲覧数 {props.view}/月</p>
            <p>{props.group}に人気</p>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminPopularSystemCard)