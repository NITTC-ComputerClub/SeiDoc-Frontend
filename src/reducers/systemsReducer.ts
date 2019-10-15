import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemByAlgoliaSearchCreator, deleteSystemsCreator, updateSystemsCreator } from '../actions/action'
import { SystemsState } from '../types/type';

const initialState: SystemsState = {
    systems: [],
    loading: true
}

export const CategoryButtonReducer = reducerWithInitialState(initialState)
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
    .case(updateSystemsCreator, (state, fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData,
            loading: false
        })
    })
    .case(deleteSystemsCreator, (state) => {
        return Object.assign({}, state, {
            systems: [],
            loading: false
        })
    })