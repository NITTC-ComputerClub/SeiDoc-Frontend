import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { updateDetailCreator, fetchSystemByCategory, deleteSystemsCreator, addTagCreator, fetchSystemByAlgoliaSearch } from '../../actions/action'
import Indicator from '../../user/components/indicator'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import { System } from '../../types/type';
import styled from 'styled-components';
import setting from '../../designSystem/setting';

type historyProps = RouteComponentProps

const Grid = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 16px;
    padding: 0;
    margin-bottom: 32px;
`

const AdminSystemCard = styled.li`
    background-color: ${setting.White};
    list-style: none;
    border-radius: 4px;
    padding: 16px;

    h2, p {
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    h2 {
        font-size: ${setting.H2};
    }

    p {
        font-size: ${setting.P1};
    }

    .view {
        margin-top: 8px;
    }
`

const AdminSystemList: React.FC<historyProps> = (props) => {
    const tag = parse(props.location.search).tag as string
    const inputValue = parse(props.location.search).value as string
    const systems = useSelector((state: AppState) => state.systemsState.systems)
    const loading = useSelector((state: AppState) => state.systemsState.loading)
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))

    //データのfetch
    useEffect(() => {
        const categorySearch = (category: string) => dispatch(fetchSystemByCategory(category))
        const alogliaSearch = (query: string, category: string) => dispatch(fetchSystemByAlgoliaSearch(query, category))
        const addTag = (newtag: string) => dispatch(addTagCreator(newtag))
        const deleteSystems = () => dispatch(deleteSystemsCreator())
        if (tag !== undefined && inputValue !== undefined) {    //アルゴリアサーチ
            console.log('algolia', 'input:', inputValue, 'tag:', tag)
            alogliaSearch(inputValue, tag)
        }
        else if (tag !== undefined && inputValue === undefined) {   //カテゴリーオンリー
            console.log('category', 'input:', inputValue, 'tag:', tag)
            categorySearch(tag)
            addTag(tag)
        }
        else {
            deleteSystems()
        }
    }, [dispatch, tag, inputValue])

    return (
        <div>
            {console.log('systems:', systems)}
            {loading ? <Indicator /> :
                <Grid>
                    {systems.map((system: System) => (
                        <AdminSystemCard key={system.Name} onClick={() => {
                            updateDetail(system)    //リロードなしでページを遷移させるのに必要
                            props.history.push('/admin/detail/' + system.documentID)
                        }
                        }>
                            <h2>{system.Name}</h2>
                            <p>{system.Department}</p>
                            <p className="view">閲覧数　{system.monthlyView}回/月</p>
                            {/* 今だとundefined
                                <p>{system.ageGroup[0].age}代に人気</p> 
                            */}
                        </AdminSystemCard>
                    ))}
                </Grid>
            }
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(AdminSystemList)