import * as React from 'react'
import LocalSearchButton from '../components/Top/localSearchButton'
import PopularSystemCard from '../components/Top/popularSystemCard'
import Ranking from '../components/Top/ranking'
import SystemSearchButton from '../components/Top/systemSearchButton'

const Top: React.FC = () => {
    return (
        <div>
            <SystemSearchButton />
            <LocalSearchButton />
            <h2>みんなが見ている制度</h2>
            <PopularSystemCard />
            <h2>住みやすい街ランキング</h2>
            <Ranking />
        </div>
    )
}

export default Top