import React, { useEffect, useState } from 'react';
import { fireStore } from '../firebase/firebase'
import { System } from '../reducers/systemsReducer'
const firebaseCollection : string = 'aaaaa'

type systemData = {
    id: string,
    data: System,
    willDelete: boolean,
    isNewCreate: boolean // True if it is a new system
}

const ViewAll: React.FC = () => {
    let [searchData, setSearchData] = useState<{ [key: string]: systemData }>({})
    const [originalData, setOriginalData] = useState<{ [key: string]: systemData }>({})
    const [isFetched, setFetchFlag] = useState<Boolean>(false)

    const fetchSystemAll = () => {
        const dataList: { [key: string]: systemData } = {};
        fireStore.collection(firebaseCollection).get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        const data = doc.data() as System
                        dataList[doc.id] = { id: doc.id, data: data, willDelete: false , isNewCreate: false }
                    })
                }
            ).then(() => {
                setSearchData(Object.assign({}, dataList))
                setOriginalData(JSON.parse(JSON.stringify(dataList))) //参照渡しさせない
                setFetchFlag(true)
            })
    }

    //TODO:このへんのエラー処理
    const updateSystem = (uuid: string, newData: System) => {
        fireStore.collection(firebaseCollection)
            .doc(uuid)
            .update(newData)

    }

    const addNewSystemToFirebase = (uuid: string, newData: System) => {
        fireStore.collection(firebaseCollection).add(newData)
    }

    // TODO:このへんの エラー処理
    const deleteSystem = (uuid: string) => {
        fireStore.collection(firebaseCollection).doc(uuid).delete()
    }
    const checkDeleteSystems = () => {
        const keys = Object.keys(searchData)
        const deleteKeys : string[] = []
        keys.forEach(key => {
            if(searchData[key].willDelete)deleteKeys.push(key)
        })
        if(deleteKeys.length === 0){
            console.log('チェックされていません')
        } else {
            console.log(deleteKeys)
            deleteKeys.forEach(key => deleteSystem(key))
            alert('削除しました。')
            setTimeout(() => refresh(), 1000); // wait for delete
        }   
    }
    const makeRandomID = () => {
        // 生成する文字列の長さ
        const l = 8;
        // 生成する文字列に含める文字セット
        const charSet = "abcdefghijklmnopqrstuvwxyz0123456789";
        const charLength = charSet.length;
        let randomID = "";
        for(var i=0; i<l; i++){
            randomID += charSet[Math.floor(Math.random()*charLength)];
        }
        return randomID
    }

    const addNewSystem = () => {
        const newSystem : System = {
            Name: '',
            Department: '',
            Location: '',
            Site: '',
            Detail: '',
            Target: '',
            Method: [''],
            Category: ['']
        }
        const newID = makeRandomID()
        console.log(newID)
        searchData[newID] = {id: newID, data: newSystem, willDelete: false , isNewCreate: true};
        setSearchData(Object.assign({}, searchData)); //objectを変えないと再描画されないっぽい
    }

    const checkSystems = () => {  
        const keys = Object.keys(searchData)
        let diff :string[] = [];

        keys.forEach(key => {
                //めっちゃ厳密に比較
                if(originalData[key] == null){
                    diff.push(key)
                    
                } else if(JSON.stringify(objectSort(originalData[key])) !== JSON.stringify(objectSort(searchData[key]))){
                    diff.push(key)
                }
        });

        if(diff.length !== 0) {
            console.log('差分発見!')
            
            diff.forEach(key => {
                if(searchData[key].isNewCreate){
                    console.log('新規制度発見',searchData[key].data.Name)
                    addNewSystemToFirebase(key, searchData[key].data)
                }else{
                    console.log('既存の制度を更新します。', searchData[key].data.Name)
                    updateSystem(key,searchData[key].data)
                }
            })
            refresh()
        } else {
            console.log('差分はないよ')
        }
    }

    const refresh = () => {
        setFetchFlag(false)
        fetchSystemAll()
    }

    const objectSort = (obj :any) => {
        const keys = Object.keys(obj).sort()
        let newMap :any = {};

        keys.forEach(key => {
            let val  = obj[key]
            if(typeof val === "object"){
                val = objectSort(val)
            }
            newMap[key] = val;
        });
        return newMap;
    }

    useEffect(() => {
        console.log('現状は無視してください')
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        let tmp  = e.target.name as 'Name' | 'Site' //TODO: 黒魔術やめる
        searchData[key].data[tmp] = e.target.value;
        //あたらしいStateをset
        setSearchData(Object.assign({}, searchData)); 
    }

    const handleDeleteCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>,key: string) => {
        searchData[key].willDelete = e.target.checked
        setSearchData(Object.assign({}, searchData));
    }

    return (
        <div>
            <h2>全データ</h2>
            <button onClick={fetchSystemAll}>取得</button>
            <button onClick={e => checkSystems()}>更新</button>
            <button onClick={e => {if(window.confirm('チェックが入っているデータを削除してよろしいですか?')) checkDeleteSystems()}}>削除</button>
            <button onClick={e => addNewSystem()}>新規作成</button>
            {isFetched?<table>
                <thead>
                    <tr>
                        <th>削除</th>
                        <th>制度名</th>
                        <th>課</th>
                        <th>場所</th>
                        <th>URL</th>
                        <th>詳細</th>
                        <th>対象</th>
                        <th>方法</th>
                        <th>カテゴリ</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(searchData).map(key =>
                            <tr key={key}>
                                <td><input type='checkbox' value={searchData[key].id} onChange={e => handleDeleteCheckboxChange(e,key)}></input></td>
                                <td><input type='text' name='Name' value={searchData[key].data.Name} onChange={e => handleInputChange(e, key)}></input></td>
                                <td><input type='text' name='Department' value={searchData[key].data.Department} onChange={e => handleInputChange(e, key)}></input></td>
                                <td><input type='text' name='Location' value={searchData[key].data.Location} onChange={e => handleInputChange(e,key)}></input></td>
                                <td><input type='text' name='Site' value={searchData[key].data.Site} onChange={e => handleInputChange(e,key)}></input></td>
                                <td><input type="text" name="Detail" value={searchData[key].data.Detail} onChange={e => handleInputChange(e,key)}></input></td>
                                <td><input type="text" name="Target" value={searchData[key].data.Target} onChange={e => handleInputChange(e,key)}></input></td>
                                <td><input type="text" name="Method" value={searchData[key].data.Method} onChange={e => handleInputChange(e,key)}></input></td>
                                <td><input type="text" name="Category" value={searchData[key].data.Category} onChange={e => handleInputChange(e,key)}></input></td>
                            </tr>)
                    }
                </tbody>
            </table>
            : <div></div>}
        </div>
    )
}

export default ViewAll

