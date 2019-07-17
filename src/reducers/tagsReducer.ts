import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addTags, deleteTags } from '../actions/action'


export type TagsState = {
    tags: Array<string>
}

const initialState: TagsState = {
    tags: []
}

export const TagsReducer = reducerWithInitialState(initialState)
    .case(addTags, (state, newTag) => {
        return Object.assign({}, state, {
            tags: state.tags.concat(newTag)
        })
    })
    .case(deleteTags, (state, payload) => {
        return Object.assign({},state,{
            tags: state.tags.filter(el => el !== payload)
        })
    })