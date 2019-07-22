import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { deleteTagCreator, deleteSystemsCreator } from '../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const Tag: React.FC<historyProps> = (props: historyProps) => {
    const tag = useSelector((state: AppState) => state.tagstate.tag)
    const dispatch = useDispatch()
    const deleteTag = () => dispatch(deleteTagCreator())
    const deleteSystems = () => dispatch(deleteSystemsCreator())
    console.log(tag)
    return (
        <div>
            <div>
                {tag === '' ?
                    <div></div> :
                    <button key={tag} onClick={() => {
                        deleteTag()
                        deleteSystems()
                        props.history.push('/')
                    }}>{tag}タグを削除</button>}
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Tag)