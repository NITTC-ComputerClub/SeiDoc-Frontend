import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemByCategoryCreator, fetchSystemByAlgoliaSearchCreator, deleteSystemsCreator } from '../actions/action'

export type System = {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: Array<string>,
    Category: Array<string>,
    CreatedAt: number,
    UpdatedAt: number,
    isDeleted: boolean,
    ExpireAt: number
}


export type SystemsState = {
    systems: Array<System>
    loading: boolean
}

const initialState: SystemsState = {
    systems: [],
    loading: false
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