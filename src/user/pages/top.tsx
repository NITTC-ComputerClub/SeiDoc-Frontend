import React from "react"
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import SearchButton from "../components/Top/searchButton";
import PopularSystemList from "../components/Top/popularSystemList";
import Recommend from "../components/Top/recommend"
import Footer from "../components/footer";
import Header from '../components/header'

import "../../scss/top.scss";

const Top: React.FC = () => {
  const user = useSelector((state: AppState) => state.userState)
  return (
    <div className="top">
      <Header />
      <div className="title">
        <div className="wrapper">
          <img src="img/logo.png" alt="SeiDocロゴ" />
        </div>
        <div className="buttons">
          <SearchButton
            green
            nextLocation="/category"
          >制度名から調べる</SearchButton>
          {/* TODO: 地域から調べるページへ遷移 */}
          <SearchButton
            blue
            nextLocation="/"
          >地域から調べる</SearchButton>
        </div>
      </div>
      <section className="container">
        {/* TODO Recommendのfetch */}
        {user.userId !== '' &&
          <div>
            <h2>あなたにおすすめの制度</h2>
            <Recommend />
          </div>
        }
        <h2>みんなが見ている制度</h2>
        <PopularSystemList />
      </section>
      <Footer />
    </div>
  );
};

export default Top;
