import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SignUp from '../components/Login/signUp'

type historyProps = RouteComponentProps

const UserRegistration: React.FC<historyProps> = (props) => {
    return (
        <div>
            <p>新規登録</p>
            <SignUp />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(UserRegistration)