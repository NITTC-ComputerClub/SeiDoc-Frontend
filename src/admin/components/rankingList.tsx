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
    const [popularData, setPopularData] = useState<Array<System[]>>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const popularDataArray: System[] = []
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))

    useEffect(() => {
        setIsLoading(true)
        fireStore.collection(systemIndex).orderBy("monthlyView", "desc").get()
        .then (
            (snapshot) => {
                snapshot.forEach((doc) => {
                    popularDataArray.push(doc.data() as System)
                })
            }
        ).then (
            () => {
                setCategoryPopularData()
                setIsLoading(false)
            }
        )
    }, [dispatch])

    const setCategoryPopularData = () => {
        const categoryList: Array<string> = [
            '子育て', '介護', '建築', '病気', '融資', '地域', '高齢者'
        ]
        const categoryPopularDataArray: Array<System[]> = []
        categoryPopularDataArray[0] = popularDataArray.slice(0, 4)
        categoryList.forEach((category: string, index: number) => {
            categoryPopularDataArray[index + 1] = []
            popularDataArray.forEach((system: System) => {
                if (system.Category.some(value => value === category)) {
                    categoryPopularDataArray[index + 1].push(system)
                }
            })
            categoryPopularDataArray[index + 1].splice(4)
        })
        console.log(popularDataArray)
        console.log(categoryPopularDataArray)
    }

    return !isLoading ? (
        <div>
            <Grid>

            </Grid>
        </div>
    ) : (
        <Indicator />
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(RankingList)