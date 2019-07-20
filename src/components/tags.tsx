import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { deleteTagsCreator, deleteSystemsCreator } from '../actions/action'
import { withRouter, RouteComponentProps } from 'react-router'

type historyProps = RouteComponentProps

const Tags: React.FC<historyProps> = (props: historyProps) => {
    const tags = useSelector((state: AppState) => state.tags.tags)
    const dispatch = useDispatch()
    const deleteTags = (tag: string) => dispatch(deleteTagsCreator(tag))
    const deleteSystems = () => dispatch(deleteSystemsCreator())
    console.log(tags)
    return (
        <div>
            <div>
                {tags.map((tag) => (
                    <button key={tag} onClick={() => {
                        deleteTags(tag)
                        deleteSystems()
                        props.history.push('/')
                    }}>{tag}タグを削除</button>
                ))}
            </div>
        </div>
    )
}

export default withRouter<historyProps, React.FC<historyProps>>(Tags)