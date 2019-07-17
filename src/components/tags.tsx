import * as React from 'react'
import { TagsState } from '../reducers/tagsReducer'
import { TagsActions } from '../containers/tagsContainer'

type tagsProps = TagsState & TagsActions

const Tags: React.FC<tagsProps> = (props: tagsProps) => {
    return (
        <div>
            <div>
                {console.log(props)}
                <button onClick={() => props.addTags('A')}>Aタグを追加</button>
                <button onClick={() => props.addTags('B')}>Bタグを追加</button>
                <button onClick={() => props.addTags('C')}>Cタグを追加</button>
                {props.tags.map((tag)=>(
                    <button key={tag} onClick={() => props.deleteTags(tag)}>{tag}タグを削除</button>
                ))}
            </div>
        </div>
    )
}

export default Tags