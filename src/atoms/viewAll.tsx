import React, { useEffect } from 'react';
import { fireStore } from '../firebase/index'
import { System } from '../reducers/systemsReducer'

const ViewAll: React.FC = () => {
    const fetchSystemAll = () => {
        const systemsData: Array<System> = []
        fireStore.collection('systems').get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        systemsData.push(doc.data() as System)
                    })
                }
            ).then(() => {
                console.log(systemsData)
            })
    }
    const updateSystem = (uuid: string, newData: System) => { }
    const deleteSystem = (uuid: string) => { }

    useEffect(() => {
        console.log('現状は無視してください')
    }, [])
    return (
        <div>
            <h2>全データ</h2>
            <button onClick={fetchSystemAll}>取得</button>
            <button>追加</button>
            <button>削除</button>
        </div>
    )
}

export default ViewAll