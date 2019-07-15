import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { systemActions, addTags, deleteTags } from '../actions/action'

type System = {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: Array<string>,
    Category: Array<string>
}

export interface TagsState {
    system?: System
    tags: Array<String>
}

const initialState: TagsState = {
    system: {
        Name: '',
        Department: '',
        Location: '',
        Site: '',
        Detail: '',
        Target: '',
        Method: [''],
        Category: ['']
    },
    tags: []
}

export const TagsReducer = reducerWithInitialState(initialState)
    .case(addTags, (state, payload) => {
        return { tags: state.tags.concat(payload) }
    })
    .case(deleteTags, (state, payload) => {
        const index = state.tags.indexOf(payload)
        return { tags: state.tags.slice(index, 1) }
    })