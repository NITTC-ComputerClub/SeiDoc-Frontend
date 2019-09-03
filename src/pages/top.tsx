import React from "react";
import SearchButton from "../components/Top/searchButton";
import PopularSystemList from "../components/Top/popularSystemList";
import Ranking from "../components/Top/ranking";
import Footer from "../components/footer";
import Header from '../pages/header'
import { Link } from 'react-router-dom'

import "../scss/top.scss";

const Top: React.FC = () => {
  return (
    <div className="top">
      <Header />
      <div className="title">
        <div className="wrapper">
          <img src="img/logo.png" alt="SeiDocロゴ" />
        </div>
        <div className="buttons">
          <SearchButton
            buttonName="制度名から調べる"
            nextLocation="/category"
            buttonColor="#44DD9D"
          />
          {/* TODO: 地域から調べるページへ遷移 */}
          <SearchButton
            buttonName="地域から調べる"
            nextLocation="/"
            buttonColor="#449DDD"
          />
        </div>
      </div>
      <section className="container">
        <h2>みんなが見ている制度</h2>
        <PopularSystemList />
        <h2>住みやすい街ランキング</h2>
        <Ranking />
      </section>
      <Footer />
      <Link to="/admin/input">admin</Link> 
    </div>
  );
};

export default Top;
