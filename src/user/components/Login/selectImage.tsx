import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { awsRekognition, awsResData, profileDataType } from '../../../types/type'

type resType = {
    FaceDetails: Array<awsResData>
}
type propsType = {
    setProfileData: React.Dispatch<React.SetStateAction<Array<profileDataType>>>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectImage: React.FC<propsType> = (props) => {
    const [select, setSelect] = useState<boolean>(false)
    const [readerResult, setReaderResult] = useState<string>('')

    const AWS = require('aws-sdk')
    const accessKey = process.env.REACT_APP_AWS_ACCESSKEY
    const secretKey = process.env.REACT_APP_AWS_SECRETKEY
    AWS.config.update({
        region: 'ap-northeast-1',
        credentials: new AWS.Credentials(accessKey, secretKey)
    });
    const rekognition = new AWS.Rekognition()

    const getBinary = (encodedFile: string) => {
        const base64Image = encodedFile.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
        const binaryImg = atob(base64Image)
        const length = binaryImg.length
        const ab = new ArrayBuffer(length)
        const ua = new Uint8Array(ab)
        for (let i = 0; i < length; i++) {
            ua[i] = binaryImg.charCodeAt(i)
        }
        return ab
    }

    const handleRekognition = () => {
        const params = {
            Image: {
                Bytes: getBinary(readerResult)
            },
            Attributes: [
                'ALL'
            ]
        }
        props.setIsLoading(true)
        rekognition.detectFaces(params, (err: string, res: resType) => {
            if (err) {
                console.log(err)
            } else {
                const data: Array<awsRekognition> = []
                res.FaceDetails.forEach(value => {
                    data.push(_.pick(value, ['AgeRange', 'BoundingBox', 'Gender']))
                })
                console.log('res:', data)
                const img = new Image()
                img.src = readerResult
                img.onload = () => {
                    /* 専用データの作成 */
                    props.setProfileData(createData(data, img))
                    props.setIsLoading(false)
                }
            }
        })

    }

    const createData = (data: Array<awsRekognition>, img: HTMLImageElement) => {
        const profileData: Array<profileDataType> = []

        // 拡大・縮小倍率の取得
        const shrinkW = 350 / img.width
        const shrinkH = 400 / img.height

        data.forEach(element => {
            const heigh = element.BoundingBox.Height * img.height * shrinkH
            const left = element.BoundingBox.Left * img.width * shrinkW
            const top = element.BoundingBox.Top * img.height * shrinkH
            const width = element.BoundingBox.Width * img.width * shrinkW
            const gender = element.Gender.Value
            let age = 0
            if (element.AgeRange.High > 20 && element.AgeRange.Low > 20) {
                age = element.AgeRange.High
            }
            else {
                age = Math.round((element.AgeRange.High + element.AgeRange.Low) / 2)
            }
            let relationship = ''

            if (age > 45 && gender === 'Male') {
                relationship = '父'
            }
            else if (age > 45 && gender === 'Female') {
                relationship = '母'
            }
            else if (age <= 45 && age >= 23 && gender === 'Male') {
                relationship = '夫'
            }
            else if (age <= 45 && age >= 23 && gender === 'Female') {
                relationship = '妻'
            }
            else if (age < 23 && gender === 'Male') {
                relationship = '息子'
            }
            else if (age < 23 && gender === 'Female') {
                relationship = '娘'
            }

            profileData.push({
                age: age,
                boundingBox: {
                    width: width,
                    height: heigh,
                    left: left,
                    top: top
                },
                gender: gender,
                relationship: relationship,
                isMyself: false
            })
        })

        console.log('profileData:', profileData)
        return profileData
    }

    const imageShow = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as FileList
        const file: File = fileList[0]
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        const obj = document.getElementById('showImage') as HTMLElement

        const reader = new FileReader()

        reader.onload = () => {
            /* 前回の入力フォームを削除 */
            const inputNode = document.querySelectorAll('input.info')
            if (inputNode.length !== 0) {
                inputNode.forEach((child) => {
                    obj.removeChild(child)
                })
            }
            const selectNode = document.querySelectorAll('select.info')
            if (selectNode.length !== 0) {
                selectNode.forEach((child) => {
                    obj.removeChild(child)
                })
            }

            const image = reader.result as string
            setReaderResult(image)
            const img = new Image()
            img.src = image
            img.onload = () => {
                context.drawImage(img, 0, 0, 350, 400)  //写真描画
                setSelect(true)
            }
        }
        reader.readAsDataURL(file)
    }

    const returnView = () => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.clearRect(0, 0, 350, 400)
        setSelect(false)
    }

    return (
        <div>
            <p>家族写真から家族構成を<br/>自動で識別します</p>
            {select ?
                <div>
                    <button onClick={() => handleRekognition()}>この写真で識別</button>
                    <button onClick={returnView}>別の写真を選択</button>
                </div> :
                <div>
                    <input accept='image/*' multiple type='file' onChange={e => imageShow(e)} />
                    <Link to='/'>スキップ</Link>
                </div>
            }
        </div>
    )
}

export default SelectImage