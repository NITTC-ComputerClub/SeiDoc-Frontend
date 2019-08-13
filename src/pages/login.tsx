import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SignIn from '../components/Login/signIn'

type historyProps = RouteComponentProps

const Login: React.FC<historyProps> = (props) => {
    return (
        <div>
            <p>ログイン</p>
            <SignIn />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Login)