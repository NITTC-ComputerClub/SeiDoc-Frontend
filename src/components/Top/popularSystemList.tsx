import React, { useState } from 'react'
import PopularSystemCard from './popularSystemCard'
import { fireStore, popularPageIndex } from '../../firebase/firebase';

type rankingData = {
    id: number,
    systemName: string,
    systemLocation: string,
    documentID: string
}
type rankings = {
    ranking: rankingData[]
}
const compareASC = (a: rankingData,b: rankingData) => {
    if(a.id < b.id){
        return -1
    }else{
        return 1
    }
}
const getToday = () => {
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth()+1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + "-" + m + "-" + d;
    return result;
  }

const PopularSystemList: React.FC = () => {
    const [rankingData, setRankingData] = useState<rankingData[]>([{id:-1, systemName: '-1', systemLocation: 'none', documentID: 'XXX'}])
    
    const isLoaded = () => {
        if(rankingData[0].id !== -1){
            return true
        }else{
            return false
        }
    }

    if(rankingData[0].id === -1){ //一度だけfetch
        fireStore.collection(popularPageIndex).doc(getToday()).get().then(
            doc => {
                if(doc.exists){
                    const data = doc.data() as rankings
                    data.ranking.sort(compareASC)
                    setRankingData(data.ranking)
                }
            }
        ).catch(err => console.error(err))
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