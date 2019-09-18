import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import styled from 'styled-components';
import Button from '../../designSystem/Button';
import { fireStore, systemIndex } from '../../firebase/firebase';
import { System } from '../../types/type';
import _ from 'lodash';
import { FaWindows } from 'react-icons/fa';




const Select = styled.select` 
    width: 100%;
    height: 36px;
    margin-bottom: 16px;
    padding: 8px;
    border-radius: 2px;
    border: none;
    vertical-align: middle;
`

const CSVDownload: React.FC = () => {
    const [category, setCategory] = useState<string>('すべて')
    const [isName, setIsName] = useState<boolean>(false)
    const [isCategory, setIsCategory] = useState<boolean>(false)
    const [isTarget, setIsTarget] = useState<boolean>(false)
    const [isDepartment,setIsDepartment] = useState<boolean>(false)
    const [isDetail,setIsDetail] = useState<boolean>(false)
    const [isOfficialURL, setIsOfficialURL] = useState<boolean>(false)
    const [isMethod, setIsMethod] = useState<boolean>(false)

    const json2csv = (json: Partial<System>[]) => {
        console.log(json)
        const header = Object.keys(json[0]).join(',') + "\n";
        const body = json.map(d => {
            return Object.keys(d).map(key => {
                const query = key as 'Name' // ヤバイ
                return d[query];
            }).join(',');
        }).join("\n");
        return header + body;
    }
    const createCSV = (systemList: System[]) => {
        console.log("systemList", systemList.length, systemList)
        const query: string[] = []
        if(isName){
            query.push('Name')
        }
        if(isCategory){ query.push('Category') }
        if(isTarget){ query.push('Target') }
        if(isDepartment){ query.push('Department') }
        if(isDetail){ query.push('Detail') }
        if(isOfficialURL){ query.push('Site') }
        //const data: System[] = [];
        const pickedData = systemList.map(system => {
            return _.pick(system, query)
        })
        
        const csv = json2csv(pickedData)
        console.log(csv)
        const blob = new Blob([csv],{ type: 'text/csv'})
        const fileName = 'data.csv'
        
        const a = document.createElement('a')
        a.download = fileName
        a.href = URL.createObjectURL(blob)
        a.click()
        console.log("CSV出力完了！")
    }
    const handleSubmit = () => {
        console.log(category,isName,isCategory,isTarget,isDepartment,isDetail,isOfficialURL)
        const systemList : System[] = []
        if(category === 'すべて'){
            fireStore.collection(systemIndex).get().then(
                snapshot => {
                    snapshot.forEach(doc => {
                        systemList.push(doc.data() as System)
                    })
                }
            ).then(
                () => {
                    createCSV(systemList)
                });
        }else{
            fireStore.collection(systemIndex).where("Category", "array-contains",category).get().then(
                snapshot => {
                    snapshot.forEach(doc => {
                        systemList.push(doc.data() as System)
                    })
                }
            ).then(
                () => {
                    createCSV(systemList)
                });
        }
    }

    return (
        <div>
            <Header />
            <div>
                <h5>データ内容</h5>
                <Select onChange={e => setCategory(e.target.value)}>
                    <option value="すべて">全カテゴリ</option>
                    <option value="子育て">子育て</option>
                    <option value="介護">介護</option>
                    <option value="建築">建築</option>
                    <option value="病気">病気</option>
                    <option value="融資">融資</option>
                    <option value="地域">地域</option>
                    <option value="高齢者">高齢者</option>
                    <option value="その他">その他</option>
                </Select>
            </div>
            <div>
                <h2>項目</h2>
                <div>
                <h5>制度名</h5>
                <input
                    type="checkbox"
                    checked={isName}
                    onChange={() => setIsName(!isName)}
                />
                </div>
                <h5>カテゴリ</h5>
                <input
                    type="checkbox"
                    checked={isCategory}
                    onChange={() => setIsCategory(!isCategory)}
                />
                <h5>制度対象者</h5>
                <input
                    type="checkbox"
                    checked={isTarget}
                    onChange={() => setIsTarget(!isTarget)}
                />
                <h5>援助方法</h5>
                <input
                    type="checkbox"
                    checked={isMethod}
                    onChange={() => setIsTarget(!isMethod)}
                />
                <h5>担当部署</h5>
                <input
                    type="checkbox"
                    checked={isDepartment}
                    onChange={() => setIsDepartment(!isDepartment)}
                />
                <h5>詳細</h5>
                <input
                    type="checkbox"
                    checked={isDetail}
                    onChange={() => setIsDetail(!isDetail)}
                />
                <h5>公式サイト</h5>
                <input
                    type="checkbox"
                    checked={isOfficialURL}
                    onChange={() => setIsOfficialURL(!isOfficialURL)}
                />
            </div>  
            <div>
                <Button onClick={() => handleSubmit()}>CSVとして出力</Button>
            </div>
        <Footer />
        </div>
    )
}


export default CSVDownload