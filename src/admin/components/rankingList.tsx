import React, { useState } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { System } from '../../types/type'
import { fireStore, systemIndex } from '../../firebase/firebase'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
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

const RankingList: React.FC<historyProps> = props => {
    const categoryList: Array<string> = [
        '総合', '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
    ]
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [popularData, setPopularData] = useState<System[]>([])
    const popularDataArray: System[] = []
    const [viewData, setViewData] = useState<System[]>([])
    
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))

    const setCategoryPopularData = (value: string) => {
        if (value === '総合') {
            setViewData(popularData.slice(0, 3))
            console.log(viewData)
        } else {
            popularData.map((system: System) => {
                system.Category.map((category: string) => {
                    if (value === category) {
                        viewData.push(system)
                    }
                })
            })
            setViewData(viewData.slice(0, 3))
            console.log(viewData)
        }
        return (
            <div>
                <h4>{value}</h4>
                {viewData.map((system: System) => (
                    <AdminSystemList key={system.Name} onClick={() => {
                        updateDetail(system)    //リロードなしでページを遷移させるのに必要
                        props.history.push('/admin/detail/' + system.documentID)
                    }}>
                        <h2>{system.Name}</h2>
                        <p>閲覧数 {system.monthlyView}/月</p>
                        <p className="blue">{system.ageGroup[0].age}代に人気</p>
                    </AdminSystemList>
                ))}
            </div>
        )
    }

    if (popularData.length === 0) {
        fireStore.collection(systemIndex).orderBy("monthlyView", "desc").get()
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

    return isLoading ? (
        <div>
            <Grid>
                {categoryList.map((category: string) => {
                    setCategoryPopularData(category)
                })}
            </Grid>
        </div>
    ) : (
            <Indicator />
        )
}

export default withRouter<historyProps, React.FC<historyProps>>(RankingList)