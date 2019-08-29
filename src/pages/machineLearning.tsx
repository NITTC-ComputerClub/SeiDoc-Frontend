import React from 'react'
import axios from 'axios'

const MachineLearning: React.FC = () => {
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
                console.log(result.data)
                imageDraw(image)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const imageDraw = (image: File) => {
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D

        const img = new Image()
        img.src = image.name
        img.onload = () => {
            context.drawImage(img, 0, 0, 600, 400)
        }

        console.log(canvas, context, img)
    }
    return (
        <div>
            <input accept='image/*' multiple type='file' onChange={e => machineLearning(e)} />
            <canvas id='cvs' width='600' height='400'></canvas>
        </div>
    )
}

export default MachineLearning