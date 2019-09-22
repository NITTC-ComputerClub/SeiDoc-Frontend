import React, { useEffect } from 'react'
import drawProfile from './drawProfile'
import { profileDataType } from '../../../types/type'

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

    const clearImage = () => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        const obj = document.getElementById('showImage') as HTMLElement

        // 前回の入力フォームを削除
        const ageNode = document.querySelectorAll('input.view_age')
        if (ageNode.length !== 0) {
            ageNode.forEach((child) => {
                obj.removeChild(child)
            })
        }
        const relationshipNode = document.querySelectorAll('input.view_relationship')
        if (relationshipNode.length !== 0) {
            relationshipNode.forEach((child) => {
                obj.removeChild(child)
            })
        }
        context.clearRect(0, 0, 350, 400)

        props.setProfileData([])
    }

    //TODO ここで本人の性別も変更できたらいいのでは？
    canvas.addEventListener('click', onClick, false)

    return (
        <div>
            <button onClick={clearImage}>戻る</button>
            <button onClick={() => {
                canvas.removeEventListener('click', onClick, false)
                props.setProfileData(props.profileData)
                props.setMyself(false)
            }}>次へ</button>
        </div>
    )
}

export default Myself