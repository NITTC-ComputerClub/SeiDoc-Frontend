import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router'
import Header from '../components/header'
import Footer from '../../user/components/footer-pc'
import CategoryCardsList from '../../user/components/categoryCardsList'
import SearchBar from '../../user/components/searchBar'
import PopularSystemList from '../components/popularSystemList'

type historyProps = RouteComponentProps

const Search: React.FC<historyProps> = props => {
    return (
        <div>
            <Header />
            <SearchBar pushTo="/admin/search" />
            <CategoryCardsList pc pushTo="/admin/search" />
            <h2>カテゴリ別の閲覧状況</h2>
            <CategoryCardsList pc pushTo="/admin/status" />
            <h2>一か月以内によく見られている制度</h2>
            <PopularSystemList />
            <a href="/admin/top">> さらに詳しく</a>
            <h2>最近の検索ワード</h2>
            <p>戸建て</p>
            <p>家庭</p>
            <p>特養</p>
            <p>個人事業主</p>
            <p>学校</p>
            <p>扶養家族</p>
            <p>託児所</p>
            <p>耐震工事</p>
            <p>LED</p>
            <p>免許更新</p>
            <p>生活保護</p>
            <p>大学</p>
            <p>成人</p>
            <p>診断書</p>
            <Footer />
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Search)