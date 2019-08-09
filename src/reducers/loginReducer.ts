import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loginCreator } from '../actions/action'

export type LoginData = {
    email: string,
    password: string
}

export type UserState = {
    birthday: string,
    income: number,
    address: string,
    family: string
}

const initialState: UserState = {
    birthday: '',
    income: 0,
    address: '',
    family: ''
}


export const SelectSystemReducer = reducerWithInitialState(initialState)
    .case(loginCreator, (state, loginData) => {
        return Object.assign({}, state, {
            
        })
    })