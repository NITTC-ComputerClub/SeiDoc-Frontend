import React, { useState } from 'react'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import Indicator from '../../user/components/indicator'
import { System } from '../../types/type'
import styled from 'styled-components';
import setting from '../../designSystem/setting';

type historyProps = RouteComponentProps

const AdminSystemList = styled.li`
    list-style: none;
    background-color: ${setting.White};
    border-radius: 4px;
    padding: 8px;

    h2 {
        margin: 0 0 4px 0;
        font-size: ${setting.H2};
    }

    p {
        margin: 0;
        font-size: ${setting.P2};
    }

    .blue {
        color: ${setting.ThemeBlue};
    }
`

const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 0;
    grid-gap: 8px;
`

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
            <Grid>
                {popularData.map((system: System) => (
                    <AdminSystemList key={system.Name} onClick={() => {
                        updateDetail(system)    //リロードなしでページを遷移させるのに必要
                        props.history.push('/admin/detail/' + system.documentID)
                    }}>
                        <h2>{system.Name}</h2>
                        <p>閲覧数 {system.monthlyView}/月</p>
                        <p className="blue">{system.ageGroup[0].age}代に人気</p>
                    </AdminSystemList>
                ))}
            </Grid>
        </div>
    ) : (
        <Indicator />
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(AdminPopularSystemList)