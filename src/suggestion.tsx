import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "./store";
import { System } from './types/type';
import { fireStore } from "./firebase/firebase";

type rankingType  = {
    documentID: string;
    system: System;
    count: number;
}
const calcAge = function(birthday: string){
    const d = new Date();
    const today = ''+d.getFullYear()+('0'+(d.getMonth()+1)).slice(-2)+('0'+d.getDate()).slice(-2);
    const b = new Date(birthday);
    const b_day = ''+b.getFullYear()+('0'+(b.getMonth()+1)).slice(-2)+('0'+b.getDate()).slice(-2);
    return Math.floor((parseInt(today)-parseInt(b_day))/10000);
  };

const Suggestion: React.FC = () => {
  const user = useSelector((state: AppState) => state.userState);
  fireStore.collection('backup').get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            const data = doc.data() as System
            const ranking : rankingType = {documentID: data.documentID, system: data, count:0}
            const userAge = calcAge(user.birthday)
            if(data.targetAge === 15){
                ranking.count++
            }
            const sex = ['male','female','None']
            if(sex[data.targetSex] === user.sex){
                ranking.count++
            }
            if(data.targetFamily === user.family)
            
        })
    })

  return <div>suggestion</div>;
};

export default Suggestion;
