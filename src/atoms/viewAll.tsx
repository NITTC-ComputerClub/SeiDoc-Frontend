import React, { useEffect, useState } from 'react';
import { fireStore } from '../firebase/index'
import { System } from '../reducers/systemsReducer'
import systemList from '../components/systemList';

type systemData = {
    id: string,
    data: System
}

const ViewAll: React.FC = () => {
    const [searchData, setSearchData] = useState<systemData[]>([])

    const fetchSystemAll = () => {
        const dataList: systemData[] = [];
        fireStore.collection('systems').get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data() as System
                        dataList.push(
                            {
                                id: doc.id,
                                data: data
                            })
                    })
                }
            ).then(() => {
                setSearchData(dataList)
                console.log(dataList)
            }
            )
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
            <table>
                <thead>
                    <tr>
                        <th>制度名</th>
                        <th>課</th>
                        <th>場所</th>
                        <th>URL</th>
                        <th>詳細</th>
                        <th>方法</th>
                        <th>カテゴリ</th>
                    </tr>
                </thead>
                <tbody>
                    {searchData.map(data => (
                        <tr key={data.id}>
                            <td>{data.data.Name}</td>
                            <td>{data.data.Department}</td>
                            <td>{data.data.Location}</td>
                            <td>{data.data.Site}</td>
                            <td>{data.data.Detail}</td>
                            <td>{data.data.Target}</td>
                            <td>{data.data.Method}</td>
                            <td>{data.data.Category}</td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </div>
    )
}

export default ViewAll