import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../../store'
import { deleteTagCreator, deleteSystemsCreator } from '../../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'
import { parse } from 'query-string'
import '../../scss/tag.scss'

interface historyProps extends RouteComponentProps {
    pushTo: string
}

const Tag: React.FC<historyProps> = (props) => {
    const tag = useSelector((state: AppState) => state.tagState.tag)
    const inputValue = parse(props.location.search).value as string
    const dispatch = useDispatch()
    const deleteTag = () => dispatch(deleteTagCreator())
    const deleteSystems = () => dispatch(deleteSystemsCreator())
    if (inputValue === undefined)
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
    else return <div></div>
}

export default withRouter<historyProps, React.FC<historyProps>>(Tag)