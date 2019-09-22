import React, { useState } from 'react'
import SystemCard from './SystemCard'
import { fireStore, searchLogIndex } from '../../../firebase/firebase';
import { System, searchLogType } from '../../../types/type';
import Indicator from '../indicator'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { useSelector } from 'react-redux'
import { AppState } from '../../../store';

const StyledRecommend = styled.div`
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

type rankingType = {
    documentID: string;
    system: System;
    count: number;
}
const Recommend: React.FC = () => {
    const [recommendData, setrecommendData] = useState<rankingType[]>([]);
    const user = useSelector((state: AppState) => state.userState);
    let newRanking: rankingType[] = []



    const isLoaded = () => {
        if (recommendData.length !== 0) {
            return true;
        } else {
            return false;
        }
    };

    if (recommendData.length === 0) {
        //一度だけfetch
        fireStore.collection('backup').get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data() as System
                    const ranking: rankingType = { documentID: data.documentID, system: data, count: 0 }
                    if (data.targetAge === 15) {
                        ranking.count = ranking.count + 1
                    }
                    if (data.targetSex === user.sex || data.targetSex === 2) {
                        ranking.count = ranking.count + 1
                    }
                    if (user.family.some((value) => { return value.relation === data.targetFamily })) {
                        ranking.count = ranking.count + 1
                    }
                    fireStore.collection(searchLogIndex).where("userID", "==", user.userId).get().then(snapshot => {
                        snapshot.forEach(doc => {
                            const searchLog = doc.data() as searchLogType
                            // console.log(searchLog.searchWord)
                            if (~data.Detail.indexOf(searchLog.searchWord) || ~data.Name.indexOf(searchLog.searchWord)) {
                                ranking.count = ranking.count + 1
                                //   console.log('matched!')
                            }
                        })
                    })
                        .then(() => newRanking.push(ranking))
                        .then(() => {
                            const sortedRanking = newRanking.sort(compare);
                            //console.log(sortedRanking)
                            setrecommendData(sortedRanking.slice(0, 4))
                        })
                        .catch(err => console.error(err))
                })
            })
            .catch(err => {
                console.error(err);
            });
    }


    return isLoaded() ? (
        <StyledRecommend>
            <ul>
                {recommendData.map(data => (
                    <SystemCard key={data.system.Name} system={data.system} />
                ))}
            </ul>
            <Link to="/">さらに詳しく</Link>
        </StyledRecommend>
    ) : (
            <Indicator />
        );
};

export default Recommend
