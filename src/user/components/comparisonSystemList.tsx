import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import Indicator from './indicator'
import { withRouter, RouteComponentProps } from 'react-router'
import "../../scss/systemList.scss"
import { System } from '../../types/type';
import SystemCard from './Top/SystemCard';

interface propsType extends RouteComponentProps {
    region: string,
    systems: Array<System>,
}

const ComparionSystemList: React.FC<propsType> = (props) => {
    const loading = useSelector((state: AppState) => state.systemsState.loading)
    console.log('systems:', props.systems)

    return (
        <div className="systemList">
            {loading ? <Indicator /> :
                <ul>
                    {
                        props.systems.map((system: System) => (
                            <SystemCard
                                wide
                                key={system.Name}
                                system={system}
                            />
                        ))
                    }
                </ul>
            }
        </div>
    )
}
export default withRouter<propsType, React.FC<propsType>>(ComparionSystemList)