import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { selectSystemListCreator } from '../actions/action'
import { System } from './systemsReducer'

export type SelectSystemsState = {
    systems: Array<System>
}

const initialState: SelectSystemsState = {
    systems: []
}
export const SelectSystemReducer = reducerWithInitialState(initialState)
    .case(selectSystemListCreator, (state, newSystem) => {
        return Object.assign({}, state, {
            systems: newSystem
        })
    })