import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { updateDetailCreator, fetchSystemByCategory, deleteSystemsCreator, addTagCreator, fetchSystemByAlgoliaSearch } from '../../actions/action'
import Indicator from '../../user/components/indicator'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import { System } from '../../types/type';

type historyProps = RouteComponentProps

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
        <div className="systemList">
            {console.log('systems:', systems)}
            {loading ? <Indicator /> :
                <ul>
                    {systems.map((system: System) => (
                        <li key={system.Name} onClick={() => {
                            updateDetail(system)    //リロードなしでページを遷移させるのに必要
                            props.history.push('/admin/detail/' + system.documentID)
                        }
                        }>
                            <h4>{system.Name}</h4>
                            <p>{system.Department}</p>
                            <h6>閲覧数 {system.monthlyView}/月</h6>
                            {system.ageGroup.length === 0 ? <div></div> : <p>{system.ageGroup[0].age}代に人気</p>}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(AdminSystemList)