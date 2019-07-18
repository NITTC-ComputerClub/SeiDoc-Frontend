import * as React from 'react'
import { SystemsState } from '../reducers/systemsReducer'

type systemListProps = SystemsState

const SystemList: React.FC<systemListProps> = (props: systemListProps) => {
    return (
        <div>
            {console.log(props.systems.length)}
            {props.systems.length === 0 ?
                <p>検索結果がありません</p>
                :
                <ul>
                    {props.systems.map((system: firebase.firestore.DocumentData) => (
                        <li key={system.Name}>
                            <h4>{system.Name}</h4>
                            <p>{system.Location}</p>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
export default SystemList