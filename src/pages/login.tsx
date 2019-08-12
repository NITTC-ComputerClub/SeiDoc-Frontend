import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Signin from '../components/Login/signIn'

type historyProps = RouteComponentProps

const Login: React.FC<historyProps> = (props) => {
    return (
        <div>
            <Signin />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Login)