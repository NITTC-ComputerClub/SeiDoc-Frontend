import React, { useState } from 'react'
import Picture from '../components/Login/picture'
import SelectImage from '../components/Login/selectImage'
import FixProfile from '../components/Login/fixProfile'
import Footer from '../components/footer';
import { profileData } from '../../types/type'
import '../../scss/userRegistration.scss'

const PicturePage: React.FC = () => {
    const [profileData, setProfileData] = useState<Array<profileData>>([])
    console.log('CH', profileData)
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                <Picture />
                {profileData.length === 0 ?
                    <SelectImage setProfileData={setProfileData} /> :
                    <FixProfile />
                }
            </div>
            <Footer />
        </div>
    )
}

export default PicturePage