import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SignUp from '../components/Login/signUp'
import '../scss/userRegistration.scss'

type historyProps = RouteComponentProps

const UserRegistration: React.FC<historyProps> = (props) => {
    return (
        <div className="signUp">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <SignUp />
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(UserRegistration)