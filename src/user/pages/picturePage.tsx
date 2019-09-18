import React, { useState } from 'react'
import Picture from '../components/Login/picture'
import SelectImage from '../components/Login/selectImage'
import FixProfile from '../components/Login/fixProfile'
import Footer from '../components/footer';
import { profileDataType } from '../../types/type'
import '../../scss/userRegistration.scss'

const PicturePage: React.FC = () => {
    const [profileData, setProfileData] = useState<Array<profileDataType>>([])
    console.log('CH', profileData)
    return (
        <div className="userRegistration">
            <div className="signUpForm">
                <div className="title">
                    <img src="/img/logo.png" alt="SeiDocのロゴ"></img>
                    <h2>登録</h2>
                </div>
                {profileData.length !== 0 &&
                    <div>
                        <p>修正したい人物の顔をタッチして</p>
                        <p>情報を修正してください</p>
                    </div>}
                <Picture />
                {profileData.length === 0 ?
                    <SelectImage setProfileData={setProfileData} /> :
                    <FixProfile profileData={profileData} />
                }
            </div>
            <Footer />
        </div>
    )
}

export default PicturePage