import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import styled from 'styled-components';
import Button from '../../designSystem/Button';
import { fireStore, systemIndex } from '../../firebase/firebase';
import { System } from '../../types/type';



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

    const handleSubmit = () => {
        console.log(category,isName,isCategory,isTarget,isDepartment,isDetail,isOfficialURL)
        const systemList : System[] = []
        fireStore.collection(systemIndex).where("Category", "array-contains",category).get().then(
            snapshot => {
                snapshot.forEach(doc => {
                    systemList.push(doc.data() as System)
                })
            }
        ).then(
            () => {
                console.log("systemList", systemList.length, systemList)
            }
        )
        console.log("CSV出力完了！")

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
                    checked={isTarget}
                    onChange={() => setIsTarget(!isTarget)}
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