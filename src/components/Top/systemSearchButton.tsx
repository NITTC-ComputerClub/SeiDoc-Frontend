import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const SystemSearchButton: React.FC<historyProps> = (props: historyProps) => {
    return (
        <div>
            <button onClick={() => {
                props.history.push('/')
            }}>制度名から調べる</button>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SystemSearchButton)