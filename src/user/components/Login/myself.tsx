import React, { useEffect } from 'react'
import drawProfile from './drawProfile'
import { profileDataType } from '../../../types/type'

type propsType = {
    profileData: Array<profileDataType>,
    setProfileData: React.Dispatch<React.SetStateAction<Array<profileDataType>>>,
    setMyself: React.Dispatch<React.SetStateAction<boolean>>
}

const Myself: React.FC<propsType> = (props) => {
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
        context.clearRect(0, 0, canvas.width, canvas.height)

        props.setProfileData([])
    }

    useEffect(() => {
        drawProfile(props.profileData)
    }, [props.profileData])

    useEffect(() => {
        const cvs = document.getElementById('cvs') as HTMLCanvasElement
        let sequence: number

        const onClick = (e: MouseEvent) => {
            const rect = cvs.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            const flag = props.profileData.some((value) => { return value.isMyself === true })
            props.profileData.forEach((element, index) => {
                if (element.boundingBox.left <= x && x <= (element.boundingBox.left + element.boundingBox.width)
                    && element.boundingBox.top <= y && y <= (element.boundingBox.top + element.boundingBox.height)) {
                    if (flag) {
                        const value = props.profileData.filter((value) => value.isMyself === true)
                        value[0].isMyself = false
                        const index = props.profileData.indexOf(value[0])
                        props.profileData.splice(index, 1, value[0])
                    }
                    sequence = index
                    const value = element
                    value.isMyself = true
                    handleProfileData(value)
                }
            })
        }

        const handleProfileData = (data: profileDataType) => {
            props.profileData.splice(sequence, 1, data)
            drawProfile(props.profileData)
        }

        cvs.addEventListener('click', onClick, false)
        
        return () => {
            cvs.removeEventListener('click', onClick, false)
        }
    }, [props])

    return (
        <div>
            <button onClick={clearImage}>戻る</button>
            <button onClick={() => {
                props.setProfileData(props.profileData)
                props.setMyself(false)
            }}>次へ</button>
        </div>
    )
}

export default Myself