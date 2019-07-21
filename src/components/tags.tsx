import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { deleteTagsCreator, deleteSystemsCreator } from '../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const Tags: React.FC<historyProps> = (props: historyProps) => {
    const tags = useSelector((state: AppState) => state.tags.tags)
    const dispatch = useDispatch()
    const deleteTags = () => dispatch(deleteTagsCreator())
    const deleteSystems = () => dispatch(deleteSystemsCreator())
    console.log(tags)
    return (
        <div>
            <div>
                {tags === '' ?
                    <div></div> :
                    <button key={tags} onClick={() => {
                        deleteTags()
                        deleteSystems()
                        props.history.push('/')
                    }}>{tags}タグを削除</button>}
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Tags)