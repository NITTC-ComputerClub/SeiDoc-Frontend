import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { addTagCreator, deleteTagCreator } from '../actions/action'

export interface TagState {
    tag: string
}

const initialState: TagState = {
    tag: ''
}

export const TagReducer = reducerWithInitialState(initialState)
    .case(addTagCreator, (state, newTag) => {
        return Object.assign({}, state, {
            tag: newTag
        })
    })
    .case(deleteTagCreator, (state, targetTag) => {
        return Object.assign({}, state, {
            tag: ''
        })
    })