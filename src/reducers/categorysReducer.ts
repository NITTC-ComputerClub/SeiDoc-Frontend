import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { systemFetch } from '../actions/action'

export type SystemsState = {
    systems: firebase.firestore.DocumentData
}

const initialState: SystemsState = {
    systems: []
}
export const CategoryButtonReducer = reducerWithInitialState(initialState)
    .case(systemFetch, (state, fetchdata) => {
        return Object.assign({}, state, {
            systems: fetchdata
        })
    })