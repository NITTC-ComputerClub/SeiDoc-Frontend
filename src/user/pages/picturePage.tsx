import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Picture from '../components/Login/picture'
import '../../scss/userRegistration.scss'
import Footer from '../components/footer';

type historyProps = RouteComponentProps

const picturePage: React.FC<historyProps> = (props) => {
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <Picture />
            </div>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(picturePage)