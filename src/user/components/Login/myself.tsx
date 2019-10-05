import React, { useEffect } from 'react'
import drawProfile from './drawProfile'
import { profileDataType } from '../../../types/type'
import Button from '../../../designSystem/Button'
import styled from 'styled-components'

type propsType = {
    profileData: Array<profileDataType>,
    setProfileData: React.Dispatch<React.SetStateAction<Array<profileDataType>>>,
    setMyself: React.Dispatch<React.SetStateAction<boolean>>
}

const Menu = styled.div`
    display: flex;
    margin: 32px 0;
    padding: 0 32px;

    .left {
        margin: 0 0 0 auto;
    }
`

const Myself: React.FC<propsType> = (props) => {
    const clearImage = () => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const obj = document.getElementById('showImage') as HTMLElement

        // 前回の入力フォームを削除
        const ageNode = document.querySelectorAll('input.viewAge')
        if (ageNode.length !== 0) {
            ageNode.forEach((child) => {
                obj.removeChild(child)
            })
        }
        const relationshipNode = document.querySelectorAll('input.viewRelationship')
        if (relationshipNode.length !== 0) {
            relationshipNode.forEach((child) => {
                obj.removeChild(child)
            })
        }

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
            const ratio = cvs.width / cvs.clientWidth // client -> canvas 座標変換用
            const x = (e.clientX - rect.left) * ratio
            const y = (e.clientY - rect.top) * ratio
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
        <Menu>
            <Button normal link onClick={clearImage}>戻る</Button>
            <Button className="left" blue onClick={() => {
                props.setProfileData(props.profileData)
                props.setMyself(false)
            }}>次へ</Button>
        </Menu>
    )
}

export default Myself