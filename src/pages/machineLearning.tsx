import React, { useState } from 'react'
import axios from 'axios'
import { machineLearningType } from '../types/type'

const MachineLearning: React.FC = () => {
    const [cvsWidth, setCvsWidth] = useState<number>(0)
    const [cvsHeight, setCvsHeight] = useState<number>(0)
    const ageText: Array<string> = ['']

    const machineLearning = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files as FileList
        const image: File = file[0]
        /* こうかくとnullの問題でエラー
        const images = e.target.files[0] as File
        */
        const url = 'https://gateway.watsonplatform.net/visual-recognition/api/v3/detect_faces?'
        const version = 'version=2018-03-19'
        const params = new FormData()
        params.append('images_file', image)

        axios
            .post(url + version, params, {
                auth: {
                    username: 'apikey',
                    password: 'x6F7sZxxC5JsvT2GsXRFk5jmjZWeObem-YEEL5Ul5DWL'
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

                /* 前回のテキストボックスを削除 */
                const node = document.querySelectorAll('input.info')
                if (node.length !== 0) {
                    node.forEach((child) => {
                        document.body.removeChild(child)
                    })
                }

                data.map((value) => {
                    let heigh = value.face_location.height * shrinkH
                    let left = value.face_location.left * shrinkW
                    let top = value.face_location.top * shrinkH
                    let width = value.face_location.width * shrinkW

                    /* 顔に四角を生成 */
                    context.strokeRect(left, top, width, heigh)


                    /* 年齢のテキストボックスを生成 */
                    const inputAge = document.createElement('input')
                    inputAge.className = 'info' // これでCSS当てられる？
                    const age = (value.age.max + value.age.min) / 2

                    inputAge.value = age.toString()
                    inputAge.style.position = 'absolute'
                    inputAge.style.top = top - 30 + 'px'
                    inputAge.style.left = left + 'px'
                    inputAge.style.width = width/2 + 'px'
                    /* TODO：将来的に使うかもだから消さないで
                    inputAge.addEventListener('inputAge', () => addInput(inputAge.value))
                    inputAge.addEventListener('change', () => addOnChange(inputAge.value))
                    */
                    document.body.appendChild(inputAge) //bodyの子ノードリストの末尾にノードを追加
                })
            }
        }
        reader.readAsDataURL(file)
    }

    const handleGetAge = () => {
        const inputAge = document.querySelectorAll('input.info')
        inputAge.forEach((node) => {
            const el = node as HTMLInputElement
            console.log(el.value)
        })
    }

    return (
        <div>
            <canvas id='cvs' width='600' height='400'></canvas>
            <input accept='image/*' multiple type='file' onChange={e => machineLearning(e)} />
            <button onClick={handleGetAge}>確定</button>
        </div>
    )
}

export default MachineLearning