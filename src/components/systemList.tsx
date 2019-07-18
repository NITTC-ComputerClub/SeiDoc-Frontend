import * as React from 'react'
import { SystemsState } from '../reducers/categorysReducer'

type systemListProps = SystemsState

const SystemList: React.FC<systemListProps> = (props: systemListProps) => {
    return (
        <div>
            {console.log(props)}
            <ul>
                {props.systems.map((system: firebase.firestore.DocumentData) => (
                    <li key={system.Name}>
                        <h4>{system.Name}</h4>
                        <p>{system.Location}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default SystemList