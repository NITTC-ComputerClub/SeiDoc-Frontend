import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const Header: React.FC<historyProps> = (props) => {
    return (
        <div>
            <button onClick={() => { props.history.push('/login') }}>ログイン/新規登録</button>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Header)