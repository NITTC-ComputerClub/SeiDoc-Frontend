import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { awsRekognition, awsResData } from '../../../types/type'

type resType = {
    FaceDetails: Array<awsResData>
}

type historyProps = RouteComponentProps

const Correction: React.FC<historyProps> = (props) => {
    const [select, setSelect] = useState<boolean>(false)
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

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as FileList
        const image: File = fileList[0]
        const reader = new FileReader()

        reader.onload = () => {
            const img = reader.result as string

            const params = {
                Image: {
                    Bytes: getBinary(img)
                },
                Attributes: [
                    'ALL'
                ]
            };

            rekognition.detectFaces(params, (err: string, res: resType) => {
                if (err) {
                    console.log(err)
                } else {
                    const data: Array<awsRekognition> = []
                    res.FaceDetails.forEach(value => {
                        data.push(_.pick(value, ['AgeRange', 'BoundingBox', 'Gender']))
                    })
                    console.log(data)
                    imageView(img, data)
                }
            });
        }
        reader.readAsDataURL(image)
    };

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
            context.drawImage(img, 0, 0, 350, 400)  //写真描画

            /* 前回の入力フォームを削除 */
            const inputNode = document.querySelectorAll('input.info')
            if (inputNode.length !== 0) {
                inputNode.forEach((child) => {
                    obj.removeChild(child)
                })
            }

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

    return (
        <div>
            <div id='showImage'>
                <canvas id='cvs' width='350' height='400'></canvas>
            </div>
            <p>家族写真から家族構成を</p>
            <p>自動で識別します</p>
            {select ?
                <div>
                    <input accept='image/*' multiple type='file' onChange={e => handle(e)} />
                    <Link to='/'>スキップ</Link>
                </div> :
                <div>
                    <input accept='image/*' multiple type='file' onChange={e => handle(e)} />
                    <Link to='/'>スキップ</Link>
                </div>
            }
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Correction)