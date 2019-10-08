import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import SignIn from '../../user/components/Login/signIn'
import Footer from '../../user/components/footer-pc';
import "../../scss/login.scss"
import { Wrapper } from '../../designSystem/Page';


type historyProps = RouteComponentProps;

const Login: React.FC<historyProps> = (props) => {
    return (
        <Wrapper className="login">
            <div className="loginForm" >
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ" />
                    <h2>職員用</h2>
                    <h2>ログイン</h2>
                </div>
                <SignIn admin/>
            </div>
            <Footer />
        </Wrapper>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Login)