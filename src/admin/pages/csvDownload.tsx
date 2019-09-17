import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import styled from 'styled-components';


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
    const [isName, setIsName] = useState<boolean>(false)
    return (
        <div>
            <Header />
            <div>
                <h5>データ内容</h5>
                <Select>
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
                <label key="制度" >
                <h5>制度名</h5>
                <input
                    type="checkbox"
                    checked={isName}
                    onChange={() => setIsName(!isName)}
                />
                </label>
        </div>  
        <Footer />
        </div>
    )
}

export default CSVDownload