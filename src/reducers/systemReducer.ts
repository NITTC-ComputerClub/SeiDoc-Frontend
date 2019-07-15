import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { systemFetch } from '../actions/action'

export interface SystemState {
    Name: string,
    Department: string,
    Location: string,
    Site: string,
    Detail: string,
    Target: string,
    Method: Array<string>,
    Category: Array<string>
}

const initialState: SystemState = {
    Name: '',
    Department: '',
    Location: '',
    Site: '',
    Detail: '',
    Target: '',
    Method: [],
    Category: []
}

export const SystemReducer = reducerWithInitialState(initialState)