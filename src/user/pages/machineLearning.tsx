import React from 'react'
import { machineLearningType, userProfile, awsRekognition, awsResData } from '../../types/type'
import _ from 'lodash'

type resType = {
    FaceDetails: Array<awsResData>
}

const MachineLearning: React.FC = () => {
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
                        data.push(_.pick(value, ['AgeRange', 'BoundingBox']))
                    })
                    console.log(data)
                    imageView(img, data)
                }
            });
        }
        reader.readAsDataURL(image)
    };

    const imageView = (image: string, data: Array<awsRekognition>) => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.lineWidth = 3  //線の太さ設定

        const img = new Image()
        img.src = image
        img.onload = () => {
            const shrinkW = 600 / img.width
            const shrinkH = 400 / img.height
            context.drawImage(img, 0, 0, 600, 400)  //写真描画
            
            data.forEach(element => {
                const heigh = element.BoundingBox.Height * img.height * shrinkH
                const left = element.BoundingBox.Left * img.width * shrinkW
                const top = element.BoundingBox.Top * img.height * shrinkH
                const width = element.BoundingBox.Width * img.width * shrinkW

                /* 顔に四角を生成 */
                context.strokeRect(left, top, width, heigh)

            })
        }
    }

    const imageDraw = (file: File, data: Array<machineLearningType>) => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        context.lineWidth = 3  //線の太さ設定
        const reader = new FileReader()

        reader.onload = () => {
            const img = new Image()
            img.src = reader.result as string
            img.onload = () => {
                const shrinkW = 600 / img.width
                const shrinkH = 400 / img.height
                context.drawImage(img, 0, 0, 600, 400)  //写真描画

                /* 前回の入力フォームを削除 */
                const inputNode = document.querySelectorAll('input.info')
                if (inputNode.length !== 0) {
                    inputNode.forEach((child) => {
                        document.body.removeChild(child)
                    })
                }
                const selectNode = document.querySelectorAll('select.info')
                if (selectNode.length !== 0) {
                    selectNode.forEach((child) => {
                        document.body.removeChild(child)
                    })
                }

                data.forEach((value) => {
                    const heigh = value.face_location.height * shrinkH
                    const left = value.face_location.left * shrinkW
                    const top = value.face_location.top * shrinkH
                    const width = value.face_location.width * shrinkW

                    /* 顔に四角を生成 */
                    context.strokeRect(left, top, width, heigh)


                    /* 年齢のテキストボックスを生成 */
                    const inputAge = document.createElement('input')
                    inputAge.className = 'info' // これでCSS当てられる？
                    const age = Math.round((value.age.max + value.age.min) / 2)

                    inputAge.value = age.toString()
                    inputAge.style.position = 'absolute'
                    inputAge.style.top = top - 30 + 'px'
                    inputAge.style.left = left - 10 + 'px'
                    inputAge.style.width = width / 2 + 'px'
                    /* TODO：将来的に使うかもだから消さないで
                    inputAge.addEventListener('inputAge', () => addInput(inputAge.value))
                    inputAge.addEventListener('change', () => addOnChange(inputAge.value))
                    */
                    document.body.appendChild(inputAge) //bodyの子ノードリストの末尾にノードを追加

                    /* 性別のセレクトボックスを作成 */
                    const selectGender = document.createElement('select')
                    selectGender.className = 'info'
                    selectGender.add(new Option('男性', '男性'))
                    selectGender.add(new Option('女性', '女性'))
                    selectGender.add(new Option('選択しない', '選択しない'))
                    for (let i = 0; i < selectGender.length; i++) {
                        if (selectGender.options[i].value === value.gender.gender_label) {
                            selectGender.selectedIndex = i
                            break
                        }
                    }
                    selectGender.style.position = 'absolute'
                    selectGender.style.top = top - 30 + 'px'
                    selectGender.style.left = left + width / 2 + 'px'
                    document.body.appendChild(selectGender)
                })
            }
        }
        reader.readAsDataURL(file)
    }

    const handleGetAge = () => {
        const inputAge = document.querySelectorAll('input.info') as NodeListOf<HTMLInputElement>
        const selectGender = document.querySelectorAll('select.info') as NodeListOf<HTMLInputElement>
        const profile: Array<userProfile> = [{ age: '', gender: '' }]
        for (let i = 0; i < inputAge.length; i++) {
            profile.splice(i, 1, {
                age: inputAge[i].value,
                gender: selectGender[i].value
            })
        }
        console.log('userProfile', profile)
    }

    return (
        <div>
            <canvas id='cvs' width='600' height='400'></canvas>
            <input accept='image/*' multiple type='file' onChange={e => handle(e)} />
            <button onClick={handleGetAge}>確定</button>
        </div>
    )
}

export default MachineLearning

/*
    const machineLearning = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files as FileList
        const image: File = file[0]

        const url = 'https://gateway.watsonplatform.net/visual-recognition/api/v3/detect_faces?'
        const version = 'version=2018-03-19'
        const params = new FormData()
        params.append('images_file', image)

        axios
            .post(url + version, params, {
                auth: {
                    username: 'apikey',
                    password: 'v_ogdwtTpO4JhG4fbp44jbRkUIMlcwBecVIEaweQWo_Y'
                }
            })
            .then((result) => {
                const data: Array<machineLearningType> = result.data.images[0].faces
                console.log(data)
                imageDraw(image, data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
*/