import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SignUp from '../components/Login/signUp'
import '../scss/userRegistration.scss'
import Footer from '../components/footer';

type historyProps = RouteComponentProps

const UserRegistration: React.FC<historyProps> = (props) => {
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <SignUp />
            </div>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(UserRegistration)