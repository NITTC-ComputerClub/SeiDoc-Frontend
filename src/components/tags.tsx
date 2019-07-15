import * as React from 'react'
import { TagsState } from '../reducers/tagsReducer'
import { TagsActions } from '../containers/tagsContainer'

type tagsProps = TagsState & TagsActions

const Tags: React.SFC<tagsProps> = (props: tagsProps) => {
    return (
        <div>
            <div>
                {console.log(props)}
                <button onClick={() => props.addTags('A')}>タグを追加</button>
                <button onClick={() => props.deleteTags('A')}>タグを削除</button>
            </div>
        </div>
            )
        }
        
export default Tags