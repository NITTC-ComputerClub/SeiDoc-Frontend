import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

type propsType = {
    setImgBuf: React.Dispatch<React.SetStateAction<string>>,
    setNext: React.Dispatch<React.SetStateAction<boolean>>
}
type historyProps = RouteComponentProps 

const SelectImage: React.FC<historyProps> = (props) => {
    const [select, setSelect] = useState<boolean>(false)

    const imageShow = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileList = e.target.files as FileList
        const file: File = fileList[0]
        const canvas = document.getElementById('cvs') as HTMLCanvasElement
        const context = canvas.getContext('2d') as CanvasRenderingContext2D
        const reader = new FileReader()

        reader.onload = () => {
            const image = reader.result as string
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
                    <button onClick={() => console.log('push')}>この写真で識別</button>
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

export default withRouter<historyProps, React.FC<historyProps>>(SelectImage)