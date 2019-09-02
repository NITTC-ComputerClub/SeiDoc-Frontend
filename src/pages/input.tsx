import React from 'react'
import { fireStore, systemIndex } from '../firebase/firebase'
import { AppState } from '../store';
import { useSelector } from 'react-redux';
import { sendData } from '../types/type';
import Header from './header';
import Footer from '../components/footer';



const Input: React.FC = () => {
    let name: string = ''
    let department: string = ''
    let target: string = ''
    let site: string = ''
    let detail: string = ''
    let sysmethod: Array<string> = ['金銭補助']
    let category: Array<string> = []
    let systemData: sendData

    const user = useSelector((state: AppState) => state.userState)
    console.log(user)

    const post = () => {
        systemData = {
            Name: name,
            Location: user.city,
            Department: department,
            Target: target,
            Site: site,
            Detail: detail,
            Method: sysmethod,
            Category: category
        }
        console.log(systemData)
        const systemCollection = fireStore.collection(systemIndex)
        systemCollection.add(systemData).then(
            ref => {
                console.log('Added document with ID: ', ref.id)
                const mode = "no-cors"
                const method = 'POST'
                const body = JSON.stringify(systemData)
                const headers = {
                    'Accept': 'application/json'
                }
                fetch('https://script.google.com/macros/s/AKfycbz4hzx40TvDLIl4MGARBmECM1Gpp3kjb_LUEafA81O3SQ3oC2Pk/exec',
                    { mode, method, headers, body })
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            }
        ).catch(err => console.error(err))
    }

    return (
        <div>
            <Header />
            <div>
                <h3>制度登録</h3>
                <input type='text' onChange={e => { name = e.target.value }} placeholder="制度名を入力"/>
                <h5>対象地区</h5>
                <input type='text' defaultValue={user.city} />
                <h5>カテゴリ</h5>
                <select onChange={() => {}}>
                    <option defaultChecked>カテゴリを選択</option>
                    <option value="子育て">子育て</option>
                    <option value="介護">介護</option>
                    <option value="建築">建築</option>
                    <option value="病気">病気</option>
                    <option value="融資">融資</option>
                    <option value="地域">地域</option>
                    <option value="高齢者">高齢者</option>
                    <option value="その他">その他</option>
                </select>
                <h5>援助対象者</h5>
                <input type='text' onChange={e => { target = e.target.value }} />
                <h5>援助方法</h5>
                <select onChange={e => { sysmethod = [e.target.value] }}>
                    <option value='金銭補助' >金銭補助</option>
                    <option value='権利譲渡' >権利譲渡</option>
                    <option value='物品支給' >物品支給</option>
                    <option value='その他' >その他</option>
                </select>
                <h5>担当部署</h5>
                <input type='text' onChange={e => { department = e.target.value }} />
                <h5>詳細</h5>
                <textarea onChange={e => { detail = e.target.value }} />
                <h5>公式のページ</h5>
                <input type='text' onChange={e => { site = e.target.value }} />
                <br />
                <button onClick={post}>登録</button>
            </div>
            <Footer />
        </div>
    )
}
export default Input

/*
    {
        "Name": "児童手当",
        "Department": "各区民生子ども課",
        "Location": "愛知県名古屋市",
        "Site": "http://www.city.nagoya.jp/kodomoseishonen/page/0000034404.html",
        "Detail": "子どもを養育されている方に対して児童手当が支給されます。",
        "Target": "中学生以下の子ども持つ保護者",
        "Method": [
        "金銭補助"
        ],
        "Category": [
        "子育て",
        "育児"
        ]
  }
*/


