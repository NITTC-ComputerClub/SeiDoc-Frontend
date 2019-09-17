import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { awsRekognition, awsResData, profileData } from '../../../types/type'

type resType = {
    FaceDetails: Array<awsResData>
}
type propsType = {
    setNext: React.Dispatch<React.SetStateAction<boolean>>
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
        const base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
        const binaryImg = atob(base64Image);
        const length = binaryImg.length;
        const ab = new ArrayBuffer(length);
        const ua = new Uint8Array(ab);
        for (let i = 0; i < length; i++) {
            ua[i] = binaryImg.charCodeAt(i);
        }
        return ab;
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

        rekognition.detectFaces(params, (err: string, res: resType) => {
            if (err) {
                console.log(err)
            } else {
                const data: Array<awsRekognition> = []
                res.FaceDetails.forEach(value => {
                    data.push(_.pick(value, ['AgeRange', 'BoundingBox', 'Gender']))
                })
                console.log('res:', data)
                drawProfile(readerResult, data)
            }
        })

    }

    const createData = (data: Array<awsRekognition>, img: HTMLImageElement) => {
        const profileData: Array<profileData> = []

        // 拡大・縮小倍率の取得
        const shrinkW = 350 / img.width
        const shrinkH = 400 / img.height

        data.forEach(element => {
            const heigh = element.BoundingBox.Height * img.height * shrinkH
            const left = element.BoundingBox.Left * img.width * shrinkW
            const top = element.BoundingBox.Top * img.height * shrinkH
            const width = element.BoundingBox.Width * img.width * shrinkW
            const gender = element.Gender.Value
            const age = Math.round((element.AgeRange.High + element.AgeRange.Low) / 2)
            let relationship = ''

            if (age > 45 && gender === 'Male') {
                relationship = '祖父'
            }
            else if (age > 45 && gender === 'Female') {
                relationship = '祖母'
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
                relationship: relationship
            })
        })

        console.log('profileData:', profileData)
        return profileData
    }

    const drawProfile = (image: string, data: Array<awsRekognition>) => {
        const obj = document.getElementById('showImage') as HTMLElement
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.lineWidth = 3  //線の太さ設定

        const img = new Image()
        img.src = image
        img.onload = () => {
            // 専用データの作成
            const profileData: Array<profileData> = createData(data, img)

            profileData.forEach(element => {
                const heigh = element.boundingBox.height
                const left = element.boundingBox.left
                const top = element.boundingBox.top
                const width = element.boundingBox.width
                const gender = element.gender
                const age = element.age

                /* 顔に四角を生成 */
                if (gender === 'Male') {
                    context.strokeStyle = 'blue'
                }
                else if (gender === 'Female') {
                    context.strokeStyle = 'red'
                }
                context.strokeRect(left, top, width, heigh)

                /* 年齢のテキストボックスを生成 */
                const inputAge = document.createElement('input')
                inputAge.className = 'info' // これでCSS当てられる？

                inputAge.value = age.toString()
                inputAge.style.position = 'absolute'
                inputAge.style.top = top - 30 + 'px'
                inputAge.style.left = left + 'px'
                inputAge.style.width = width - 5 + 'px'
                obj.appendChild(inputAge) //bodyの子ノードリストの末尾にノードを追加

                /* 家族関係のセレクトボックス作成 */
                const selectRelationship = document.createElement('select')
                selectRelationship.className = 'info'
                selectRelationship.add(new Option('本人', '本人'))
                selectRelationship.add(new Option('夫', '夫'))
                selectRelationship.add(new Option('妻', '妻'))
                selectRelationship.add(new Option('息子', '息子'))
                selectRelationship.add(new Option('娘', '娘'))
                selectRelationship.add(new Option('祖父', '祖父'))
                selectRelationship.add(new Option('祖母', '祖母'))

                for (let i = 0;i<selectRelationship.length;i++){
                    if(selectRelationship.options[i].value === element.relationship){
                        selectRelationship.selectedIndex = i
                        break
                    }
                }

                selectRelationship.style.position = 'absolute'
                selectRelationship.style.top = top - 50 + 'px'
                selectRelationship.style.left = left + 'px'
                selectRelationship.style.width = width + 20 + 'px'
                obj.appendChild(selectRelationship)

                /* コンポーネントの変更 */
                props.setNext(true)
            })
        }
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
                    document.body.removeChild(child)
                })
            }

            const image = reader.result as string
            setReaderResult(image)
            const img = new Image()
            img.src = image
            img.onload = () => {
                context.drawImage(img, 0, 0, 350, 400)  //写真描画
                setSelect(true)
                //props.setImgBuf(image)
            }
        }
        reader.readAsDataURL(file)
    }

    return (
        <div>
            <p>家族写真から家族構成を</p>
            <p>自動で識別します</p>
            {select ?
                <div>
                    <button onClick={() => handleRekognition()}>この写真で識別</button>
                    <input accept='image/*' multiple type='file' onChange={e => imageShow(e)} />
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