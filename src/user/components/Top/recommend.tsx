import React, { useState } from 'react'
import SystemCard from './SystemCard'
import { fireStore, searchLogIndex, systemIndex } from '../../../firebase/firebase';
import { System, searchLogType, TargetAge, TargetSex } from '../../../types/type';
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
        fireStore.collection(systemIndex).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data() as System
                    const ranking: rankingType = { documentID: data.documentID, system: data, count: 0 }
                    // 家族
                    user.family.forEach(family => {
                        if(family.category.includes(data.targetAge)){
                            ranking.count += 1
                        }
                        if(data.targetSex === user.sex || data.targetSex === TargetSex.other){
                            ranking.count += 1
                        }
                    })
                    //自分
                    if (data.targetAge === TargetAge.全年齢) {
                        ranking.count += 1
                    }
                    if (data.targetSex === user.sex || data.targetSex === TargetSex.other) {
                        ranking.count += 1
                    }
                    if (data.targetFamily.includes(user.targetFamily)){
                        ranking.count += 1
                    }
                    fireStore.collection(searchLogIndex).where("userID", "==", user.userId).get().then(snapshot => {
                        snapshot.forEach(doc => {
                            const searchLog = doc.data() as searchLogType
                            if (~data.Detail.indexOf(searchLog.searchWord) || ~data.Name.indexOf(searchLog.searchWord)) {
                                ranking.count = ranking.count + 1
                            }
                        })
                    }).then(() => newRanking.push(ranking))
                        .then(() => {
                            const sortedRanking = newRanking.sort(compare);
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
