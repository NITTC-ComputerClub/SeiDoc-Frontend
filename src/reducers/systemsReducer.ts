import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemByCategoryCreator, fetchSystemByAlgoliaSearchCreator, deleteSystems } from '../actions/action'

export type SystemsState = {
    systems: firebase.firestore.DocumentData
}

const initialState: SystemsState = {
    systems: []
}
export const CategoryButtonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemByCategoryCreator, (state, fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData
        })
    }).case(fetchSystemByAlgoliaSearchCreator, (state,fetchData) => {
        return Object.assign({}, state,{
            systems: fetchData
        })
    }).case(deleteSystems, (state) => {
        return Object.assign({}, state,{
            systems: []
        }
    )
})