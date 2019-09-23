import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import { parse } from 'query-string'
import { System } from '../../types/type'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import { fireStore, systemIndex } from '../../firebase/firebase'
import Indicator from '../../user/components/indicator'
import styled from 'styled-components'
import setting from '../../designSystem/setting'

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

const CategoryRankingList: React.FC<historyProps> = props => {
    const tag = parse(props.location.search).tag as string
    const [popularData, setPopularData] = useState<System[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))

    useEffect(() => {
        const popularDataArray: System[] = []
        setIsLoading(true)
        fireStore.collection(systemIndex).where("Category", "array-contains", tag).orderBy("monthlyView", "desc").limit(15).get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        popularDataArray.push(doc.data() as System)
                    })
                }
            ).then(
                () => {
                    setPopularData(popularDataArray)
                    setIsLoading(false)
                }
            )
    }, [tag])

    return !isLoading ? (
        <div>
            <Grid>
                {popularData.map((system: System, index: number) => (
                    <AdminSystemList key={system.Name} onClick={() => {
                        updateDetail(system)
                        props.history.push('/admin/detail/' + system.documentID)
                    }}>
                        <div>{index + 1}</div>
                        <h2>{system.Name}</h2>
                        <p>{system.Department}</p>
                        <p>閲覧数 {system.monthlyView}/月</p>
                        {system.ageGroup.length === 0 ? <div></div> : <p className="blue">{system.ageGroup[0].age}代に人気</p>}
                    </AdminSystemList>
                ))}
            </Grid>
        </div>
    ) : (
            <Indicator />
        )
}

export default withRouter<historyProps, React.FC<historyProps>>(CategoryRankingList)