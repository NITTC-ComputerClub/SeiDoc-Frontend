import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemByCategoryCreator, fetchSystemByAlgoliaSearchCreator, deleteSystemsCreator } from '../actions/action'
import { SystemsState } from '../types/type';

const initialState: SystemsState = {
    systems: [],
    loading: true
}

export const CategoryButtonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemByCategoryCreator.started, (state) => {
        return Object.assign({}, state, {
            systems: [],
            loading: true
        })
    })
    .case(fetchSystemByCategoryCreator.done, (state, fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData.result,
            loading: false
        })
    })
    .case(fetchSystemByAlgoliaSearchCreator.started, (state) => {
        return Object.assign({}, state, {
            systems: [],
            loading: true
        })
    })
    .case(fetchSystemByAlgoliaSearchCreator.done, (state, fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData.result,
            loading: false
        })
    })
    .case(deleteSystemsCreator, (state) => {
        return Object.assign({}, state, {
            systems: [],
            loading: false
        })
    })