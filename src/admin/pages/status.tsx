import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import Header from '../components/header'
import Footer from '../../components/footer'
import SystemRankingList from '../components/systemRankingList'

type historyProps = RouteComponentProps;

const Status: React.FC<historyProps> = props => {
    const categoryList: Array<string> = [
        '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
    ]
    return (
        <div>
            <Header />
                <div>
                    <h2>ランキング</h2>
                    <h3>カテゴリ</h3>
                    <select>
                        <option key='すべて'>すべて</option>
                        {categoryList.map((category) => (
                            <option key={category}>{category}</option>
                        ))}
                    </select>
                    <SystemRankingList />
                </div>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Status)