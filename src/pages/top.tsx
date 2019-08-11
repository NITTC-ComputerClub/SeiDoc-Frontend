import React from 'react'
import SearchButton from '../components/Top/searchButton'
import PopularSystemCard from '../components/Top/popularSystemCard'
import Ranking from '../components/Top/ranking'

const Top: React.FC = () => {
    return (
        <div>
            <SearchButton buttonName="制度名から調べる" nextLocation="/category"/>
            {/* TODO: 地域から調べるページへ遷移 */}
            <SearchButton buttonName="地域から調べる" nextLocation="/"/>
            <h2>みんなが見ている制度</h2>
            <PopularSystemCard />
            <h2>住みやすい街ランキング</h2>
            <Ranking />
        </div>
    )
}

export default Top