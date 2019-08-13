import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const PopularSystemCard: React.FC<historyProps> = (props) => {
    return (
        <div>
            <ul>
                <li>
                    <h4>医療費補助</h4>
                    <p>愛知県名古屋市</p>
                </li>
                <li>
                    <h4>就学援助</h4>
                    <p>愛知県名古屋市</p>
                </li>
                <li>
                    <h4>子ども手当</h4>
                    <p>愛知県名古屋市</p>
                </li>
            </ul>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(PopularSystemCard)