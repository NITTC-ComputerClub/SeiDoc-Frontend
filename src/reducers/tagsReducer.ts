import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addTags, deleteTags } from '../actions/action'


export interface TagsState {
    tags: Array<String>
}

const initialState: TagsState = {
    tags: []
}

export const TagsReducer = reducerWithInitialState(initialState)
    .case(addTags, (state, payload) => {
        return { tags: state.tags.concat(payload) }
    })
    .case(deleteTags, (state, payload) => {
        return { tags: state.tags.filter(el=>el !== payload) }
    })