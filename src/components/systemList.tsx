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
            <Indicator />
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(SystemList)