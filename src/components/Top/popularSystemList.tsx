import React, { useState } from 'react'
import PopularSystemCard from './popularSystemCard'
import { fireStore, rankingType, detailPageLogIndex, logType } from '../../firebase/firebase';
import Indicator from '../indicator'

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
        const ranking: rankingType[] = [];
        fireStore
        .collection(detailPageLogIndex).where("createdAt", "<", today).where("createdAt", "<", today-604800)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
              const data = doc.data() as logType
              //console.log(data)
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
        <Indicator />
    )
}

export default PopularSystemList