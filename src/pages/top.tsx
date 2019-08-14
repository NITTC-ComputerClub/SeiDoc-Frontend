import React from "react";
import SearchButton from "../components/Top/searchButton";
import PopularSystemList from "../components/Top/popularSystemList";
import Ranking from "../components/Top/ranking";
import "../scss/top.scss";
import Footer from "../components/footer";
import { fireStore, detailPageLogIndex, logType, popularPageIndex, rankingType } from '../firebase/firebase';
import { System } from "../reducers/systemsReducer";
import { UserState } from "../reducers/loginReducer";
import actionCreatorFactory from 'typescript-fsa';

const Top: React.FC = () => {

  const aggregate = () => {
    let ranking: rankingType[] = [];
    fireStore
      .collection(detailPageLogIndex).where("createdAt", "<",Date.now())
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
            const data = doc.data() as logType
            const target = ranking.find(logData => {return logData.documentID === data.documentID})
            if(target === undefined){
                const r: rankingType = {
                    documentID : data.documentID,
                    systemName: data.system.Name,
                    systemLocation: data.system.Location,
                    count: 1
                }
                ranking.push(r)
            }else{
                target.count++
            }
        });
      })
      .then(() => {
          //fireStore.collection(popularPageIndex).doc('2019-08-14').set({ranking:ranking})
      });
  };
  aggregate()
  return (
    <div className="top">
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
    </div>
  );
};

export default Top;
