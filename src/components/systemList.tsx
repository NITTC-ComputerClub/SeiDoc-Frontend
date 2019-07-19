import * as React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../store'

const SystemList: React.FC = () => {
    const systems = useSelector((state: AppState) => state.systems.systems)
    return (
        <div>
            {console.log(systems)}
            {systems.length === 0 ?
                <p>検索結果がありません</p>
                :
                <ul>
                    {systems.map((system: firebase.firestore.DocumentData) => (
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