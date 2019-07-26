import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { updateDetailCreator } from '../actions/action'
import { System } from './systemsReducer'

export type SelectSystemsState = {
    selectSystem: System
}

const initialState: SelectSystemsState = {
    selectSystem: {
        Name: '',
        Department: '',
        Location: '',
        Site: '',
        Detail: '',
        Target: '',
        Method: [],
        Category: [],
        CreatedAt: 0,
        UpdatedAt: 0,
        isDeleted: false,
        ExpireAt: 0
    }
}


export const SelectSystemReducer = reducerWithInitialState(initialState)
    .case(updateDetailCreator, (state, newSystem) => {
        return Object.assign({}, state, {
            selectSystem: newSystem
        })
    })