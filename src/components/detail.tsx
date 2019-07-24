import * as React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'


const Detail: React.FC = () => {
    const systemList = useSelector((state: AppState) => state.selectsystemState.selectSystem)
    console.log(systemList)    
    return (
        <div>
            <div>
            </div>
        </div>
    )
}

export default Detail