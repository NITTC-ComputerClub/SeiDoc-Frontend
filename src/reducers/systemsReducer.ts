import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemByCategoryCreator, fetchSystemByAlgoliaSearchCreator, deleteSystemsCreator } from '../actions/action'

export type SystemsState = {
    systems: Array<System>
}

export type System = {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: Array<string>,
    Category: Array<string>
}

const initialState: SystemsState = {
    systems: []
}
export const CategoryButtonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemByCategoryCreator, (state, fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData
        })
    })
    .case(fetchSystemByAlgoliaSearchCreator, (state, fetchData) => {
        return Object.assign({}, state, {
            systems: fetchData
        })
    })
    .case(deleteSystemsCreator, (state) => {
        return Object.assign({}, state, {
            systems: []
        })
    })