import React from 'react'
import Finish from '../components/Login/finish'
import Footer from '../components/footer';
import '../../scss/userRegistration.scss'

const FinishPage: React.FC = () => {
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <Finish />
            </div>
            <Footer />
        </div>
    )
}

export default FinishPage