import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addTagsCreator, deleteTagsCreator } from '../actions/action'

export interface TagsState  {
    tags: Array<string>
}

const initialState: TagsState = {
    tags: []
}

export const TagsReducer = reducerWithInitialState(initialState)
    .case(addTagsCreator, (state, newTag) => {
        return Object.assign({}, state, {
            tags: state.tags.concat(newTag)
        })
    })
    .case(deleteTagsCreator, (state, targetTag) => {
        return Object.assign({}, state, {
            tags: state.tags.filter(el => el !== targetTag)
        })
    })