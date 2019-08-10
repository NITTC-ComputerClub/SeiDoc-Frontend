import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loginCreator } from '../actions/action'

/*
export type LoginData = {
    email: string,
    password: string
}*/

export type UserState = {
    userId: string,
    birthday: string,
    income: number,
    address: string,
    family: string
}

const initialState: UserState = {
    userId: '',
    birthday: '',
    income: 0,
    address: '',
    family: ''
}


export const LoginReducer = reducerWithInitialState(initialState)
    .case(loginCreator, (state, loginData) => {
        return Object.assign({}, state, {
            userId: loginData.userId,
            birthday: loginData.birthday,
            income: loginData.income,
            address: loginData.address,
            family: loginData.family
        })
    })