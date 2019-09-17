import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const FixProfile: React.FC<historyProps> = (props) => {
    const canvas = document.getElementById('cvs') as HTMLCanvasElement

    const onClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        console.log(x, y)
    }

    canvas.addEventListener('click', onClick, false)

    return (
        <div>
            <p>OK</p>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(FixProfile)