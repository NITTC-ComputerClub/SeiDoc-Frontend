import React, { useState } from 'react'
//import { fireStore } from '../firebase/firebase'
import { System } from '../reducers/systemsReducer'

import '../scss/registration.scss'

const Registration: React.FC = () => {
    const newSystem : System = {
        Name: '',
        Department: '',
        Location: '',
        Site: '',
        Detail: '',
        Target: '',
        Method: [''],
        Category: [''],
        CreatedAt: Date.now(),
        UpdatedAt: 2262025600000,
        isDeleted: false,
        ExpireAt: 2262025600000
    }
    let [currentData] = useState<System>(newSystem)
    return (
        <div className="registration">
            <h1>制度登録</h1>
            <form>
                <div className="wrapper">
                    <input id="systemName" type="text" name="Name" value={currentData.Name} placeholder="制度名を入力"></input>
                    <label>
                        <h2>カテゴリ</h2>
                        <select defaultValue="">
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
                        <input type="text" name="Target" placeholder="大まかな制度対象者を入力" value={currentData.Target}></input>
                    </label>
                    <label>
                        <h2>援助方法</h2>
                        <input type="text" name="Method" placeholder="援助方法を入力" value={currentData.Method}></input>
                    </label>
                    <label>
                        <h2>担当部署</h2>
                        <input type="text" name="Department" placeholder="担当部署を入力" value={currentData.Department}></input>
                    </label>
                    <label>
                        <h2>公式リンク</h2>
                        <input type="text" name="Site" placeholder="公式のページURLを入力" value={currentData.Site}></input>
                    </label>
                    <label>
                        <h2>詳細</h2>
                        <textarea rows={4} name="Detail" placeholder="詳細を入力" value={currentData.Detail}></textarea>
                    </label>
                </div>
                <div id="button">
                    <input type="submit" value="登録"></input>
                </div>
            </form>
        </div>
    )
}

export default Registration