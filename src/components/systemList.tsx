import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { System } from '../reducers/systemsReducer'
import { updateDetailCreator } from '../actions/action'
import Indicator from './indicator'
import { withRouter, RouteComponentProps } from 'react-router'
import "../scss/systemList.scss"

type historyProps = RouteComponentProps

const SystemList: React.FC<historyProps> = (props: historyProps) => {
    const systems = useSelector((state: AppState) => state.systemsState.systems)
    const loading = useSelector((state: AppState) => state.systemsState.loading)
    const dispatch = useDispatch()
    const updateDetail = (selectData: System) => dispatch(updateDetailCreator(selectData))
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
                                updateDetail(system)
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