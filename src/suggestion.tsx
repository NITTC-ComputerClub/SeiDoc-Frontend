import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "./store";
import { System, searchLogType, targetAge } from './types/type';
import { fireStore, searchLogIndex } from './firebase/firebase';

type rankingType  = {
    documentID: string;
    system: System;
    count: number;
}

const compare = (a: rankingType, b: rankingType) => {
    if (a.count > b.count) {
      return -1;
    } else {
      return 1;
    }
  };
const Suggestion: React.FC = () => {
  const user = useSelector((state: AppState) => state.userState);
  let newRanking: rankingType[] = []
  fireStore.collection('backup').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const data = doc.data() as System
            const ranking : rankingType = {documentID: data.documentID, system: data, count:0}
            if(data.targetAge == 15){
              ranking.count = ranking.count + 1
            }
            if(data.targetSex == user.sex || data.targetSex == 2){
              ranking.count = ranking.count + 1
            }
            if(data.targetFamily == user.family){
              ranking.count = ranking.count + 1
            }
            fireStore.collection(searchLogIndex).where("userID", "==", user.userId).get().then(snapshot => {
              snapshot.forEach(doc => {
                const searchLog = doc.data() as searchLogType
                console.log(searchLog.searchWord)
                if(~data.Detail.indexOf(searchLog.searchWord) || ~data.Name.indexOf(searchLog.searchWord)){
                  ranking.count = ranking.count + 1
                  console.log('matched!')
                }
              })
            }).then(() => newRanking.push(ranking)).then(() => {
              const sortedRanking = newRanking.sort(compare);
              console.log(sortedRanking.slice(0,4))
            })
            .catch(err=>console.error(err))
        })
    })

  return <div>suggestion</div>;
};

export default Suggestion;
