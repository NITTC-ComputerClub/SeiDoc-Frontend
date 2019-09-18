import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const Finish: React.FC<historyProps> = (props) => {
    return (
        <div>
            <p>登録が完了しました</p>
            <button onClick={() => props.history.push('/')}>始める</button>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Finish)