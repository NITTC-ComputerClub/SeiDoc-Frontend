import React from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../../store'
import { withRouter, RouteComponentProps } from 'react-router'
import '../../scss/tag.scss'

interface historyProps extends RouteComponentProps {
    pushTo: string
}

const Tag: React.FC<historyProps> = (props) => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    return (
        <div className="tag">
            {tag === '' ?
                <div></div> :
                <p>{tag}</p>}
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Tag)