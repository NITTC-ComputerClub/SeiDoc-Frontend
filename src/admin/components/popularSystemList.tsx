import React, { useState } from 'react'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { System } from '../../types/type'
import Indicator from '../../user/components/indicator'

const AdminPopularSystemList: React.FC = () => {
    const [popularData, setPopularData] = useState<System[]>([])
    const [isLoading ,setIsLoading] = useState<boolean>(false)

    const popularDataArray :System[] = [];

    if(popularData.length === 0){
    fireStore.collection(systemIndex).orderBy("monthlyView", "desc").limit(4).get()
        .then( 
            (snapshot) => {
                snapshot.forEach((doc) => {
                    popularDataArray.push(doc.data() as System)
                })
            }
        ).then(
            () => {
                setPopularData(popularDataArray);
                setIsLoading(true)
            }
        )
    }
    console.log(popularData)


    return isLoading ? (
        <div>
            <ul>
                {popularData.map((system: System) => (
                    <li key={system.Name}>
                        <h4>{system.Name}</h4>
                        <h6>閲覧数 {system.monthlyView}/月</h6>
                        <p>{system.ageGroup[0].age}に人気</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <Indicator />
    )
}

export default AdminPopularSystemList