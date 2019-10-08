import React, { useState } from 'react'
import Picture from '../components/Login/picture'
import SelectImage from '../components/Login/selectImage'
import Myself from '../components/Login/myself'
import FixProfile from '../components/Login/fixProfile'
import Footer from '../components/footer';
import { Wrapper, MainContents, Container } from '../../designSystem/Page';
import { profileDataType } from '../../types/type'
import styled from 'styled-components'
import setting from '../../designSystem/setting'

const Form = styled.div`
    background-color: ${setting.White};
    margin: 16px 0;
    border-radius: 4px;
    text-align: center;
    overflow: hidden;
`

const TitleLogo = styled.img`
    height: 40px;
    margin-top: 32px;
`

const FamilyImg = styled.img`
    width: 128px;
`

const Message = styled.p`
    font-size: ${setting.P1};
    color: ${setting.ThemeGreen};
`

const getNavigationMessage = (isLoadedImg: boolean, myself: boolean) => {
    if (isLoadedImg) {
        if (myself) {
            return (
                <Message>自分の顔をタッチしてください</Message>
            )
        } else {
            return  (
                <Message>修正したい人物の顔をタッチして<br />情報を修正してください</Message>
            )
        }
    } else {
        return ""
    }
}

const PicturePage: React.FC = () => {
    const [profileData, setProfileData] = useState<Array<profileDataType>>([])
    const [select, setSelect] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [myself, setMyself] = useState<boolean>(true)
    const isLoadedImg = profileData.length !== 0

    return (
        <Wrapper>
            <Container>
                <MainContents>
                    <Form>
                        <div className="title">
                            <TitleLogo src="/img/logo.png" alt="SeiDocのロゴ"></TitleLogo>
                            <h2>新規登録</h2>
                        </div>
                        {getNavigationMessage(isLoadedImg, myself)}
                        {select ?
                            "" :
                            <FamilyImg src="/img/family.png" alt="家族"></FamilyImg>
                        }
                        <Picture select={select} isLoading={isLoading}/>
                        {!isLoadedImg ?
                            <SelectImage select={select} setSelect={setSelect} setProfileData={setProfileData} setIsLoading={setIsLoading} /> :
                            myself ?
                                <Myself profileData={profileData} setProfileData={setProfileData} setMyself={setMyself} /> :
                                <FixProfile profileData={profileData} />
                        }
                    </Form>
                </MainContents>
            </Container>
            <Footer />
        </Wrapper >
    )
}

export default PicturePage