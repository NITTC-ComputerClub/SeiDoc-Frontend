import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../../store'
import { loginCreator } from '../../../actions/action'
import drawProfile from './drawProfile'
import { withRouter, RouteComponentProps } from 'react-router'
import { profileDataType, UserState } from '../../../types/type'
import { fireStore } from '../../../firebase/firebase'

type propsType = {
    profileData: Array<profileDataType>,
    setProfileData: React.Dispatch<React.SetStateAction<Array<profileDataType>>>,
    setMyself: React.Dispatch<React.SetStateAction<boolean>>
}

const Myself: React.FC<propsType> = (props) => {
    const canvas = document.getElementById('cvs') as HTMLCanvasElement
    let sequence: number

    useEffect(() => {
        drawProfile(props.profileData)
    }, [props.profileData])

    const onClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        props.profileData.forEach((element, index) => {
            if (element.boundingBox.left <= x && x <= (element.boundingBox.left + element.boundingBox.width)
                && element.boundingBox.top <= y && y <= (element.boundingBox.top + element.boundingBox.height)) {
                sequence = index
                const value = element
                value.relationship = '本人'
                handleProfileData(value)
            }
        })
    }

    const handleProfileData = (data: profileDataType) => {
        props.profileData.splice(sequence, 1, data)
        drawProfile(props.profileData)
    }

    //TODO ここで本人の性別も変更できたらいいのでは？
    canvas.addEventListener('click', onClick, false)

    return (
        <div>
            <button>戻る</button>
            <button onClick={() => {
                props.setProfileData(props.profileData)
                props.setMyself(false)
            }}>次へ</button>
        </div>
    )
}

export default Myself