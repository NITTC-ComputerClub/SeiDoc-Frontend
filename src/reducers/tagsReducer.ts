import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addTagsCreator, deleteTagsCreator } from '../actions/action'

export interface TagsState {
    tags: string
}

const initialState: TagsState = {
    tags: ''
}

export const TagsReducer = reducerWithInitialState(initialState)
    .case(addTagsCreator, (state, newTag) => {
        return Object.assign({}, state, {
            tags: newTag
        })
    })
    .case(deleteTagsCreator, (state, targetTag) => {
        return Object.assign({}, state, {
            tags: ''
        })
    })