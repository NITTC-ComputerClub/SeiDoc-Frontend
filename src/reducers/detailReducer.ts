import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { updateDetailCreator } from '../actions/action'
import { DetailState } from '../types/type';

const initialState: DetailState = {
    detail: {
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
        ExpireAt: 0,
        documentID: '-1',
    }
}


export const DetailReducer = reducerWithInitialState(initialState)
    .case(updateDetailCreator, (state, newSystem) => {
        return Object.assign({}, state, {
            detail: newSystem
        })
    })