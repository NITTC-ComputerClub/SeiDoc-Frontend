import * as React from 'react'
import { fireStore } from '../firebase/firebase'

type SendData = {
    Name: string
    Location: string
    Department: string
    Target: string
    Site: string
    Detail: string
    Method: Array<string>
    Category: Array<string>
}

const Input: React.FC = () => {
    let name: string = ''
    let location: string = ''
    let department: string = ''
    let target: string = ''
    let site: string = ''
    let detail: string = ''
    let sysmethod: Array<string> = ['金銭補助']
    let category: Array<string> = []
    let systemData: SendData

    const post = () => {
        systemData = {
            Name: name,
            Location: location,
            Department: department,
            Target: target,
            Site: site,
            Detail: detail,
            Method: sysmethod,
            Category: category
        }
        console.log(systemData)
        const systemCollection = fireStore.collection('postData')
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
            <h3>制度を登録</h3>
            <h5>制度名</h5>
            <input type='text' onChange={e => { name = e.target.value }} />
            <h5>対象地区</h5>
            <input type='text' onChange={e => { location = e.target.value }} />
            <h5>担当部署</h5>
            <input type='text' onChange={e => { department = e.target.value }} />
            <h5>助成対象者</h5>
            <input type='text' onChange={e => { target = e.target.value }} />
            <h5>援助方法(複数選択不可)</h5>
            <select onChange={e => { sysmethod = [e.target.value] }}>
                <option value='金銭補助' >金銭補助</option>
                <option value='権利譲渡' >権利譲渡</option>
                <option value='物品支給' >物品支給</option>
                <option value='その他' >その他</option>
            </select>
            <h5>詳細</h5>
            <input type='text' onChange={e => { detail = e.target.value }} />
            <h5>カテゴリー</h5>
            <input type='checkbox' onChange={() => { category.push('子育て') }} />子育て
            <input type='checkbox' onChange={() => { category.push('介護') }} />介護
            <input type='checkbox' onChange={() => { category.push('建築') }} />建築
            <input type='checkbox' onChange={() => { category.push('病気') }} />病気
            <input type='checkbox' onChange={() => { category.push('融資') }} />融資
            <input type='checkbox' onChange={() => { category.push('地域') }} />地域
            <input type='checkbox' onChange={() => { category.push('高齢者') }} />高齢者
            <input type='checkbox' onChange={() => { category.push('その他') }} />その他
            <h5>公式のページ</h5>
            <input type='text' onChange={e => { site = e.target.value }} />
            <br />
            <button onClick={post}>登録</button>
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


