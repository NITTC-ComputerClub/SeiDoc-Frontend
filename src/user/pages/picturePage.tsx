import React, { useState } from 'react'
import Picture from '../components/Login/picture'
import '../../scss/userRegistration.scss'
import Footer from '../components/footer';

const PicturePage: React.FC = () => {
    const [imgBuf,setImgBuf] = useState<string>('')
    console.log('CH',imgBuf)
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <Picture setImgBuf={setImgBuf}/>
            </div>
            <Footer />
        </div>
    )
}

export default PicturePage