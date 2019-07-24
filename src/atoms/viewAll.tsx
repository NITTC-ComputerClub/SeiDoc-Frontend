import React, { useEffect, useState } from 'react';
import { fireStore } from '../firebase/index'
import { System } from '../reducers/systemsReducer'
import systemList from '../components/systemList';

type systemData = {
    id: string,
    data: System,
    willDelete: boolean,
}



const ViewAll: React.FC = () => {
    const [searchData, setSearchData] = useState<{[key: string]: systemData}>({})
    const [originalData, setOriginalData] = useState<{[key: string]: systemData}>({})

    const fetchSystemAll = () => {
        const dataList: {[key: string]: systemData} = {};
        fireStore.collection('systems').get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data() as System
                        dataList[doc.id] = {id: doc.id,data: data, willDelete: false}
                    })
                }
            ).then(() => {
                setSearchData(dataList)
                setOriginalData(dataList)
                console.log(dataList)
            })
    }

    const updateSystem = (uuid: string, newData: System) => { }
    const deleteSystem = (uuid: string) => { }

    useEffect(() => {
        console.log('現状は無視してください')
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,key: string) => {
        
        let tmp = searchData; 
        //とりあえずName決め打ち
        tmp[key].data.Name = e.target.value;
        //あたらしいStateをset
        setSearchData(tmp);
        
        console.log(tmp[key].data.Name,searchData[key].data.Name)
    }

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
                    {
                        Object.keys(searchData).map(key => 
                        <tr key={key}>
                            <td><input type='checkbox' value={searchData[key].id}></input></td>
                            {/* 名前のとこ変更したい */}
                            <td><input type='text' name='name' value={searchData[key].data.Name} onChange={e=>handleInputChange(e,key)}></input></td>
                            <td>{searchData[key].data.Department}</td>
                            <td>{searchData[key].data.Location}</td>
                            <td>{searchData[key].data.Site}</td>
                            <td>{searchData[key].data.Detail}</td>
                            <td>{searchData[key].data.Target}</td>
                            <td>{searchData[key].data.Method}</td>
                            <td>{searchData[key].data.Category}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ViewAll