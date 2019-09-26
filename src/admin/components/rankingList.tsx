import React, { useState, useEffect } from 'react'
import { RouteComponentProps, withRouter } from 'react-router'
import styled from 'styled-components'
import setting from '../../designSystem/setting'
import { System } from '../../types/type'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import Indicator from '../../user/components/indicator'
import { fireStore, systemIndex } from '../../firebase/firebase'

type historyProps = RouteComponentProps

const AdminSystemList = styled.li`
    list-style: none;
    background-color: ${setting.White};
    border-radius: 4px;
    padding: 8px;
    overflow: hidden;

    h2 {
        margin: 0 0 4px 0;
        font-size: ${setting.H2};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    p {
        margin: 0;
        font-size: ${setting.P2};
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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

const categoryList: Array<string> = [
    '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
]

const RankingList: React.FC<historyProps> = props => {
    const [popularData, setPopularData] = useState<Array<System[]>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))

    useEffect(() => {
        const popularDataArray: System[] = []
        setIsLoading(true)
        fireStore.collection(systemIndex).orderBy("monthlyView", "desc").get()
            .then(
                (snapshot) => {
                    snapshot.forEach((doc) => {
                        popularDataArray.push(doc.data() as System)
                    })
                }
            ).then(
                () => {
                    setCategoryPopularData()
                    setIsLoading(false)
                }
            )
        
        const setCategoryPopularData = () => {
            console.log('check')
            const categoryPopularDataArray: Array<System[]> = []
            categoryPopularDataArray[0] = popularDataArray.slice(0, 4)
            categoryList.forEach((category: string, index: number) => {
                categoryPopularDataArray[index + 1] = []
                popularDataArray.forEach((system: System) => {
                    if (categoryPopularDataArray[index + 1].length === 4) {
                        return true
                    } else if (system.Category.some(value => value === category)) {
                        categoryPopularDataArray[index + 1].push(system)
                    }
                })
            })
            setPopularData(categoryPopularDataArray)
        }
    }, [dispatch])

    return !isLoading ? (
        <div>
            {popularData.map((data: System[], index: number) => {
                const arr = data.map((system: System) => (
                    <AdminSystemList key={system.Name} onClick={() => {
                        updateDetail(system)
                        props.history.push("/admin/detail/" + system.documentID)
                    }}
                    >
                        <h2>{system.Name}</h2>
                        <p>閲覧数 {system.monthlyView}/月</p>
                        {system.ageGroup.length === 0 ? (<div></div>) : (<p className="blue">{system.ageGroup[0].age}代に人気</p>)}
                    </AdminSystemList>
                ));
                return (
                    <div key={index}>
                        {index === 0 ? <h3>総合</h3> : <h3>{categoryList[index - 1]}</h3>}
                        <Grid>
                            {arr}
                        </Grid>
                    </div>
                )
            })}
        </div>
    ) : (
            <Indicator />
        )
}

export default withRouter<historyProps, React.FC<historyProps>>(RankingList)