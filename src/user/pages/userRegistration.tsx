import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import SignUp from '../components/Login/signUp'
import '../../scss/userRegistration.scss'
import Footer from '../components/footer';
import { Wrapper } from '../../designSystem/Page';

type historyProps = RouteComponentProps

const UserRegistration: React.FC<historyProps> = (props) => {
    return (
        <Wrapper className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <SignUp />
            </div>
            <Footer />
        </Wrapper>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(UserRegistration)