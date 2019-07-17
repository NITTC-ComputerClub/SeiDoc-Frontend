import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemCreator, fetchSystemByCategoryCreator } from '../actions/action'

export type SystemsState = {
    systems: firebase.firestore.DocumentData
}

const initialState: SystemsState = {
    systems: []
}
export const CategoryButtonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemCreator, (state, fetchdata) => {
        return Object.assign({}, state, {
            systems: fetchdata
        })
    }).case(fetchSystemByCategoryCreator, (state,fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData
        })
    })