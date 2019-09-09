import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { deleteTagCreator, deleteSystemsCreator } from '../../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import '../../scss/tag.scss'

interface historyProps extends RouteComponentProps {
    pushTo: string
}

const Tag: React.FC<historyProps> = (props) => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    const dispatch = useDispatch()
    const deleteTag = () => dispatch(deleteTagCreator())
    const deleteSystems = () => dispatch(deleteSystemsCreator())
    return (
        <div className="tag">
            {tag === '' ?
                <div></div> :
                <button key={tag} onClick={() => {
                    deleteTag()
                    deleteSystems()
                    props.history.push(props.pushTo)
                }}>{tag}<span>×</span></button>}
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Tag)