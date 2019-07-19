import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../store'
import { deleteTagsCreator, deleteSystemsCreator } from '../actions/action'

const Tags: React.FC = () => {
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
                    }}>{tag}タグを削除</button>
                ))}
            </div>
        </div>
    )
}

export default Tags