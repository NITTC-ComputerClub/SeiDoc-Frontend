import React, { useState } from 'react'
import PopularSystemCard from './popularSystemCard'
import { fireStore, popularPageIndex, rankingType, detailPageLogIndex, logType } from '../../firebase/firebase';


type rankings = {
    ranking: rankingType[]
}
const compareASC = (a: rankingType,b: rankingType) => {
    if(a.count < b.count){
        return -1
    }else{
        return 1
    }
}

  const getAWeekAgo = () => {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    const d = ("00" + dt.getDate()).slice(-2);
    const result = new Date(y,parseInt(m),parseInt(d)-7)    
    return result;
}
const getToday = () => {
    const dt = new Date();
    const y = dt.getFullYear();
    const m = ("00" + (dt.getMonth()+1)).slice(-2);
    const d = ("00" + dt.getDate()).slice(-2);
    const result = y + "-" + m + "-" + d;
    return result;
}

const PopularSystemList: React.FC = () => {
    const [rankingData, setRankingData] = useState<rankingType[]>([{count:-1, systemName: '-1', systemLocation: 'none', documentID: 'XXX'}])
    
    const isLoaded = () => {
        if(rankingData[0].count !== -1){
            return true
        }else{
            return false
        }
    }

    if(rankingData[0].count === -1){ //一度だけfetch
        const today = Date.now()
        const aWeekAgo = getAWeekAgo()
        const ranking: rankingType[] = [];
        console.log('today',today,'a week ago', aWeekAgo)
        fireStore
        .collection(detailPageLogIndex).where("createdAt", "<",today)
        .get()
        .then(snapshot => {
          console.log('fetched', snapshot.docs)
          snapshot.forEach(doc => {
              const data = doc.data() as logType
              console.log(data)
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
            console.log(ranking)
            setRankingData(ranking.slice(0,3))
        }).catch(err => {console.error(err);});
    }
    return(
        isLoaded() ?
        <div>
            <ul>
                {rankingData.map(data => <PopularSystemCard key={data.systemName} systemName={data.systemName} systemLocation={data.systemLocation} />)}
            </ul>
        </div>
        :
        <div>Loading</div>
    )
}

export default PopularSystemList