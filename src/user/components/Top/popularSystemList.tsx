import React, { useState } from 'react'
import SystemCard from './SystemCard'
import { fireStore, popularPageIndex } from '../../../firebase/firebase';
import { rankingType } from '../../../types/type'
import Indicator from '../indicator'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const StyledPopularSystemList = styled.div`
  position: relative;
  left: -24px;
  margin: 0;
  width: calc(100% + 48px);

  ul {
    list-style: none;
    margin: 0;
    padding: 0 24px 24px 24px;
    overflow-x: auto;
    white-space: nowrap;
  }

  a {
    position: relative;
    left: 24px;
  }
`

const getNowYMD = () => {
  const dt = new Date();
  const y = dt.getFullYear();
  const m = ("00" + (dt.getMonth() + 1)).slice(-2);
  const d = ("00" + dt.getDate()).slice(-2);
  const result = y + "-" + m + "-" + d;
  return result;
};

const compare = (a: rankingType, b: rankingType) => {
  if (a.count > b.count) {
    return -1;
  } else {
    return 1;
  }
};
type fireStorePopularSystemType = {
  ranking: rankingType[];
};

const PopularSystemList: React.FC = () => {
  const [rankingData, setRankingData] = useState<rankingType[]>([]);

  const isLoaded = () => {
    if (rankingData.length !== 0) {
      return true;
    } else {
      return false;
    }
  };

  if (rankingData.length === 0) {
    //一度だけfetch
    fireStore
      .collection(popularPageIndex)
      .doc(getNowYMD())
      .get()
      .then(doc => {
        if (doc.exists) {
          const ranking = doc.data() as fireStorePopularSystemType;
          const sortedRanking = ranking.ranking.sort(compare);
          console.log(sortedRanking)
          setRankingData(sortedRanking.slice(0, 3));
        } else {
          console.error("fetch failed");
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
  return isLoaded() ? (
    <StyledPopularSystemList>
      <ul>
        {rankingData.map(data => (
          <SystemCard key={data.system.Name} system={data.system} />
        ))}
      </ul>
      <Link to="/moredetails">さらに詳しく</Link>
    </StyledPopularSystemList>
  ) : (
      <Indicator />
    );
};

export default PopularSystemList;
