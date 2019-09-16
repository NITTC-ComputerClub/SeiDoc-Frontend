import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SignIn from '../components/Login/signIn'
import "../../scss/login.scss"
import Footer from  '../components/footer'
import { Wrapper } from '../../designSystem/Page'

type historyProps = RouteComponentProps

const Login: React.FC<historyProps> = (props) => {
    return (
        <Wrapper className="login">
            <div className="loginForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>ログイン</h2>
                </div>
                <SignIn />
            </div>
            <Footer />
        </Wrapper>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Login)