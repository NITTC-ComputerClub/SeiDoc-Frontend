import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { System } from '../reducers/systemsReducer'
import { updateDetailCreator, fetchSystemByCategory } from '../actions/action'
import Indicator from './indicator'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import "../scss/systemList.scss"

type historyProps = RouteComponentProps

const SystemList: React.FC<historyProps> = (props) => {
    // TODO: 無理くりすぎ →　as とか使うのがいい？
    const tag = String(parse(props.location.search).tag)
    console.log(tag)
    const systems = useSelector((state: AppState) => state.systemsState.systems)
    const loading = useSelector((state: AppState) => state.systemsState.loading)
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))
    
    /* TODO: タグなしの処理 */
    //データのfetch
    useEffect(() => {
        const categorySearch = (category: string) => dispatch(fetchSystemByCategory(category))
        categorySearch(tag)
    }, [dispatch,tag])

    return (
        <div className="systemList">
            {console.log('loading:', loading)}
            {console.log('systems:', systems)}
            {loading ? <Indicator /> :
                systems.length === 0 ?
                    <p>検索結果がありません</p>
                    :
                    <ul>
                        {systems.map((system: System) => (
                            <li key={system.Name} onClick={() => {
                                updateDetail(system)    //リロードなしでページを遷移させるのに必要
                                props.history.push('/detail/' + system.documentID)
                            }
                            }>
                                <h4>{system.Name}</h4>
                                <p>{system.Location}</p>
                            </li>
                        ))}
                    </ul>
            }
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(SystemList)