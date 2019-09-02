import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import SignInForm from '../components/signInForm';
import Footer from '../../components/footer';
import "../../scss/login.scss"


type historyProps = RouteComponentProps;

const SignIn: React.FC<historyProps> = (props) => {
    return (
        <div className="login">
            <div className="loginForm" >
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ" />
                    <h2>職員用</h2>
                    <h2>ログイン</h2>
                </div>
                <SignInForm />
            </div>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(SignIn)