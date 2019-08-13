import * as React from 'react'
import SearchButton from '../components/Top/searchButton'
import PopularSystemCard from '../components/Top/popularSystemCard'
import Ranking from '../components/Top/ranking'
import '../scss/top.scss'
import Header from '../components/header';

const Top: React.FC = () => {
    return (
        <div className="top">
            <div className="title">
                <div className="wrapper">
                    <img src="img/logo.png" alt="SeiDocロゴ"></img>
                </div>
                <div className="buttons">
                    <SearchButton buttonName="制度名から調べる" nextLocation="/category" buttonColor="#44DD9D" />
                    {/* TODO: 地域から調べるページへ遷移 */}
                    <SearchButton buttonName="地域から調べる" nextLocation="/" buttonColor="#449DDD" />
                </div>
            </div>
            <section className="container">
                <h2>みんなが見ている制度</h2>
                <PopularSystemCard />
                <h2>住みやすい街ランキング</h2>
                <Ranking />
            </section>
            <Header />
        </div>
    )
}

export default Top