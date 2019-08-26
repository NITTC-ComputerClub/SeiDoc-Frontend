import React from 'react'
import { useDispatch } from 'react-redux'
import { updateDetailCreator } from '../../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import "../../scss/popularSystemCard.scss"
import { System } from '../../types/type';

export type params = {
    system: System
}

type historyProps = RouteComponentProps
type propsType = historyProps & params

const PopularSystemCard: React.FC<propsType> = (props) => {
    const dispatch = useDispatch()
    const updateDetail = (data: System) => dispatch(updateDetailCreator(data))

    return (
        <li className="popularSystemCard" onClick={() => {
            updateDetail(props.system)
            props.history.push('/detail/' + props.system.documentID)
        }}>
            <h4>{props.system.Name}</h4>
            <p>{props.system.Location}</p>
        </li>
    )
}

export default withRouter<propsType, React.FC<propsType>>(PopularSystemCard)