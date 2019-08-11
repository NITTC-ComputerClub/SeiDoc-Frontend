import React, { useState } from 'react'
//import { fireStore } from '../firebase/firebase'
import { System } from '../reducers/systemsReducer'

import '../scss/registration.scss'
import { fireStore } from '../firebase/firebase';

const firebaseCollection: string = 'testData'


const Registration: React.FC = () => {
    const newSystem: System = {
        Name: '',
        Department: '',
        Location: '愛知県名古屋市',
        Site: '',
        Detail: '',
        Target: '',
        Method: [''],
        Category: [''],
        CreatedAt: Date.now(),
        UpdatedAt: 2262025600000,
        isDeleted: false,
        ExpireAt: 2262025600000,
        documentID: '-1',
    }
    let [currentData, setCurrentData] = useState<System>(newSystem)

    const addSystem = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log("fired")
        if (
            currentData.Name === '' ||
            currentData.Department === '' ||
            currentData.Detail === '' ||
            currentData.Site === '' ||
            currentData.Target === '' ||
            currentData.Method.toString() === '' ||
            currentData.Category.toString() === ''
        ) {
            alert("入力していないデータがあります");
        }
        else {
            fireStore.collection(firebaseCollection).add(currentData).then(ref => {
                console.log('Added document with ID: ', ref.id);
                alert("登録が完了しました。");
                setCurrentData(Object.assign({}, newSystem))
            }).catch(e => console.log(e))
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        //console.log(e.target.value)
        let tmp = e.target.name as 'Name' | 'Site' //TODO: 黒魔術やめる
        if (e.target.name === 'Category') {
            currentData[e.target.name] = [e.target.value]
        } else if (e.target.name === 'Method') {
            currentData[e.target.name] = [e.target.value]
        } else {
            currentData[tmp] = e.target.value;
        }
        //あたらしいStateをset
        setCurrentData(Object.assign({}, currentData));
    }


    return (
        <div className="registration">
            <h1>制度登録</h1>
            <form>
                <div className="wrapper">
                    <input id="systemName" type="text" name="Name" value={currentData.Name} placeholder="制度名を入力" onChange={e => handleInputChange(e)}></input>
                    <label>
                        <h2>カテゴリ</h2>
                        <select defaultValue="" name="Category" onChange={e => handleInputChange(e)}>
                            <option value="">なし</option>
                            <option value="子育て">子育て</option>
                            <option value="介護">介護</option>
                            <option value="建設">建設</option>
                            <option value="病気">病気</option>
                            <option value="融資">融資</option>
                            <option value="地域">地域</option>
                            <option value="高齢者">高齢者</option>
                        </select>
                    </label>
                    <label>
                        <h2>援助対象者</h2>
                        <input type="text" name="Target" placeholder="大まかな制度対象者を入力" value={currentData.Target} onChange={e => handleInputChange(e)}></input>
                    </label>
                    <label>
                        <h2>援助方法</h2>
                        <input type="text" name="Method" placeholder="援助方法を入力" value={currentData.Method} onChange={e => handleInputChange(e)}></input>
                    </label>
                    <label>
                        <h2>担当部署</h2>
                        <input type="text" name="Department" placeholder="担当部署を入力" value={currentData.Department} onChange={e => handleInputChange(e)}></input>
                    </label>
                    <label>
                        <h2>公式リンク</h2>
                        <input type="text" name="Site" placeholder="公式のページURLを入力" value={currentData.Site} onChange={e => handleInputChange(e)}></input>
                    </label>
                    <label>
                        <h2>詳細</h2>
                        <textarea rows={4} name="Detail" placeholder="詳細を入力" value={currentData.Detail} onChange={e => handleInputChange(e)} ></textarea>
                    </label>
                </div>
                <div id="button">
                    <input type="submit" value="登録" onClick={e => addSystem(e)}></input>
                </div>
            </form>
        </div>
    )
}

export default Registration