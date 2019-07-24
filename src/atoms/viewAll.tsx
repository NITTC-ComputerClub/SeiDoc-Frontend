import React, { useEffect } from 'react';
import { System } from '../reducers/systemsReducer'

const ViewAll: React.FC = () => {
    const fetchSystemAll = () => {}
    const updateSystem = (uuid: string, newData: System) => { }
    const deleteSystem = (uuid: string) => { }

    useEffect(() => {
        console.log('現状は無視してください')
    }, [])
    return (
        <div>
            <h2>全データ</h2>
            <button>追加</button>
            <button>削除</button>
        </div>
    )
}

export default ViewAll