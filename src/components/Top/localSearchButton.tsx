import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const LocalSearchButton: React.FC<historyProps> = (props: historyProps) => {
    return (
        <div>
            <button onClick={() => {
                /* TODO: 地域から調べるページへ遷移*/
                //props.history.push('')
                console.log('デザインまだ！？')
            }}>地域から調べる</button>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(LocalSearchButton)