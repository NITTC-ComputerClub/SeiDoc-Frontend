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

type RankProps = {
    rank: number
}

const ListWrapper = styled.div`
    position: relative;
    overflow: hidden;
`

const AdminSystemList = styled.li`
    list-style: none;
    background-color: ${setting.White};
    border-radius: 4px;
    padding: 8px;
    margin-top: 24px;
    overflow: hidden;
    height: calc(100% - 24px);
    box-sizing: border-box;

    h2 {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 0 4px 0;
        max-width: calc(100% - 54px);
        font-size: ${setting.H2};
    }

    p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0;
        font-size: ${setting.P2};
    }

    .blue {
        color: ${setting.ThemeBlue};
    }
`

const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(272px, 1fr));
    padding: 0;
    grid-gap: 8px;
`

const Rank = styled.p`
    margin: 0;
    text-align: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    ${(props: RankProps) => getRank(props.rank)}
    position: absolute;
    right: 16px;
    top: 0;
    font-size: ${setting.H1};
    font-weight: bold;
    text-align: center;
    line-height: 48px;
`

const getRank = (rank: number) => {
    switch(rank) {
        case 1:
            return `
                color: ${setting.White};
                background-color: ${setting.Yellow};
            `
        case 2:
            return `
                color: ${setting.White};
                background-color: ${setting.Gray3};
            `
        case 3:
            return `
                color: ${setting.White};
                background-color: ${setting.Orange};
            `
        default:
            return `
                color: ${setting.TextGray};
                background-color: ${setting.White};
                border: solid 2px ${setting.TextGray};
            `
    }
}

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
                    <ListWrapper key={system.Name}>
                        <Rank rank={index + 1}>{index + 1}</Rank>
                        <AdminSystemList onClick={() => {
                            updateDetail(system)
                            props.history.push('/admin/detail/' + system.documentID)
                        }}>
                            <h2>{system.Name}</h2>
                            <p>{system.Department}</p>
                            <p>閲覧数 {system.monthlyView}/月</p>
                            {system.ageGroup.length === 0 ? <div></div> : <p className="blue">{system.ageGroup[0].age}代に人気</p>}
                        </AdminSystemList>
                    </ListWrapper>
                ))}
            </Grid>
        </div>
    ) : (
            <Indicator />
        )
}

export default withRouter<historyProps, React.FC<historyProps>>(CategoryRankingList)