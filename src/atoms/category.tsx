import * as React from 'react'
import { TagsState } from '../reducers/tagsReducer'
import Tags from '../containers/tagsContainer'

type categoryProps = TagsState

const Category: React.FC<categoryProps> = (props: categoryProps) => {
    const list: Array<React.Component> = []
    console.log(props)
    return (
        <div>
            <Tags />
        </div>
    )
}

export default Category