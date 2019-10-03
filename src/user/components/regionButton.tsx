import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const RegionButton: React.FC<historyProps> = (props) => {
    const regionMap = ['愛知県名古屋市', '愛知県小牧市']

    return (
        <div>
            {regionMap.map((region) => (
                <button key={region} onClick={() => props.history.push('./category?region=' + region)}>{region}</button>
            ))}
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(RegionButton)