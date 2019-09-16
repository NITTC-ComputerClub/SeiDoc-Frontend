import React, { useState } from 'react'
import Picture from '../components/Login/picture'
import SelectImage from '../components/Login/selectImage'
import FixProfile from '../components/Login/fixProfile'
import Footer from '../components/footer';
import '../../scss/userRegistration.scss'

const PicturePage: React.FC = () => {
    const [next, setNext] = useState<boolean>(false)
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <Picture />
                {next ? 
                <FixProfile /> :
                <SelectImage setNext={setNext}/>
                }
            </div>
            <Footer />
        </div>
    )
}

export default PicturePage