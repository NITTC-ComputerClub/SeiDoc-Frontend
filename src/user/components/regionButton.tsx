import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const RegionButton: React.FC<historyProps> = (props) => {
    return (
        <div>
            <button onClick={() => props.history.push('./category?region=愛知県名古屋市')}>愛知県名古屋市</button>
            <button onClick={() => props.history.push('./category?region=愛知県小牧市')}>愛知県小牧市</button>
        </div>
    )
}
export default withRouter<historyProps, React.FC<historyProps>>(RegionButton)