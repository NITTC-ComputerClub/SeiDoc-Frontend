import React, { useState } from 'react'
import Picture from '../components/Login/picture'
import SelectImage from '../components/Login/selectImage'
import Footer from '../components/footer';
import '../../scss/userRegistration.scss'

const PicturePage: React.FC = () => {
    const [imgBuf, setImgBuf] = useState<string>('')
    const [next, setNext] = useState<boolean>(false)
    console.log('CH', imgBuf, next)
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <Picture />
                <SelectImage />
            </div>
            <Footer />
        </div>
    )
}

export default PicturePage