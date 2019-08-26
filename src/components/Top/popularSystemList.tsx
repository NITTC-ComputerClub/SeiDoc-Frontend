import React, { useState } from 'react'
import PopularSystemCard from './popularSystemCard'
import { fireStore,  detailPageLogIndex } from '../../firebase/firebase';
import { logType, rankingType } from '../../types/type'
import Indicator from '../indicator'
import "../../scss/popularSystemList.scss"

const PopularSystemList: React.FC = () => {
    const [rankingData, setRankingData] = useState<rankingType[]>([{ count: -1, system: { Name: '', Department: '', Location: '', Site: '', Detail: '', Target: '', Method: [], Category: [], CreatedAt: 0, UpdatedAt: 0, isDeleted: false, ExpireAt: 0, documentID: '-1', }, documentID: 'XXX' }])

    const isLoaded = () => {
        if (rankingData[0].count !== -1) {
            return true
        } else {
            return false
        }
    }

    if (rankingData[0].count === -1) { //一度だけfetch
        const today = Date.now()
        const ranking: rankingType[] = [];
        fireStore
            .collection(detailPageLogIndex).where("createdAt", "<", today).where("createdAt", "<", today - 604800)
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const data = doc.data() as logType
                    //console.log(data)
                    const target = ranking.find(logData => { return logData.documentID === data.documentID })
                    if (target === undefined) {
                        const r: rankingType = {
                            documentID: data.documentID,
                            system: data.system,
                            count: 1
                        }
                        ranking.push(r)
                    } else {
                        target.count++
                    }
                });
            })
            .then(() => {
                console.log(ranking)
                setRankingData(ranking.slice(0, 3))
            }).catch(err => { console.error(err); });
    }
    return (
        isLoaded() ?
            <div className="popularSystemList">
                <ul>
                    {rankingData.map(data => <PopularSystemCard key={data.system.Name} system={data.system} />)}
                </ul>
            </div>
            :
            <Indicator />
    )
}

export default PopularSystemList