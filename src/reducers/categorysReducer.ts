import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { systemFetch } from '../actions/action'

export type FetchData = {
    data: any
}

const initialState: FetchData = {
    data: []
}
export const CategoryButtonReducer = reducerWithInitialState(initialState)
    .case(systemFetch, (state,payload)=>{
        console.log(state)
        console.log(payload)
        return state
    })