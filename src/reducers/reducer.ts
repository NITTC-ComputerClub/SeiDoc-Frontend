import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { systemActions, addCategory } from '../actions/action'

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

export interface SeiDocState {
    //system: System
    selectCategory: Array<String>
}

const initialState: SeiDocState = {
    selectCategory: [""]
}

export const SeiDocReducer = reducerWithInitialState(initialState)
    .case(addCategory, (state, payload) => {
        return { selectCategory: payload }
    })