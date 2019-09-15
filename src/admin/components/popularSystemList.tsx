import React, { useState } from 'react'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import Indicator from '../../user/components/indicator'
import { System } from '../../types/type'

type historyProps = RouteComponentProps

const AdminPopularSystemList: React.FC<historyProps> = (props) => {
    const [popularData, setPopularData] = useState<System[]>([])
    const [isLoading ,setIsLoading] = useState<boolean>(false)
    const popularDataArray :System[] = []
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))

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
                setPopularData(popularDataArray)
                setIsLoading(true)
            }
        )
    }
    console.log(popularData)

    return isLoading ? (
        <div>
            <ul>
                {popularData.map((system: System) => (
                    <li key={system.Name} onClick={() => {
                        updateDetail(system)    //リロードなしでページを遷移させるのに必要
                        props.history.push('/admin/detail/' + system.documentID)
                    }}>
                        <h4>{system.Name}</h4>
                        <h6>閲覧数 {system.monthlyView}/月</h6>
                        <p>{system.ageGroup[0].age}代に人気</p>
                    </li>
                ))}
            </ul>
        </div>
    ) : (
        <Indicator />
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminPopularSystemList)
