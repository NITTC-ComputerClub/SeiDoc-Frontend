import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const FixProfile: React.FC<historyProps> = (props) => {
    return (
        <div>
            <p>OK</p>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(FixProfile)