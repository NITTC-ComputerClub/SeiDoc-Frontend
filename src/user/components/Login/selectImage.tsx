import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { awsRekognition, awsResData } from '../../../types/type'

type resType = {
    FaceDetails: Array<awsResData>
}

const SelectImage: React.FC = () => {
    const [select, setSelect] = useState<boolean>(false)
    const [readerResult, setReaderResult] = useState<string>('')

    const AWS = require('aws-sdk')
    var accessKey = process.env.REACT_APP_AWS_ACCESSKEY
    var secretKey = process.env.REACT_APP_AWS_SECRETKEY
    AWS.config.update({
        region: 'ap-northeast-1',
        credentials: new AWS.Credentials(accessKey, secretKey)
    });
    var rekognition = new AWS.Rekognition()

    const getBinary = (encodedFile: string) => {
        var base64Image = encodedFile.split("data:image/jpeg;base64,")[1];
        var binaryImg = atob(base64Image);
        var length = binaryImg.length;
        var ab = new ArrayBuffer(length);
        var ua = new Uint8Array(ab);
        for (var i = 0; i < length; i++) {
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
                console.log(data)
                imageView(readerResult, data)
            }
        })

    }
    const imageView = (image: string, data: Array<awsRekognition>) => {
        const obj = document.getElementById('showImage') as HTMLElement
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.lineWidth = 3  //線の太さ設定

        const img = new Image()
        img.src = image
        img.onload = () => {
            const shrinkW = 350 / img.width
            const shrinkH = 400 / img.height

            data.forEach(element => {
                const heigh = element.BoundingBox.Height * img.height * shrinkH
                const left = element.BoundingBox.Left * img.width * shrinkW
                const top = element.BoundingBox.Top * img.height * shrinkH
                const width = element.BoundingBox.Width * img.width * shrinkW
                const gender = element.Gender.Value

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
                const age = Math.round((element.AgeRange.High + element.AgeRange.Low) / 2)

                inputAge.value = age.toString()
                //inputAge.style.position = 'relative'
                inputAge.style.top = top - 30 + 'px'
                inputAge.style.left = left + 'px'
                inputAge.style.width = width - 5 + 'px'
                obj.appendChild(inputAge) //bodyの子ノードリストの末尾にノードを追加
                //document.body.appendChild(inputAge)
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