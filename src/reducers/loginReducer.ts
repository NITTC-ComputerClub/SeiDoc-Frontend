import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loginCreator } from '../actions/action'

export type UserState = {
    userId: string,
    nickName: string,
    birthday: string,
    income: number,
    address: string,
    family: string
}

const initialState: UserState = {
    userId: '',
    nickName: '',
    birthday: '',
    income: 0,
    address: '',
    family: ''
}


export const LoginReducer = reducerWithInitialState(initialState)
    .case(loginCreator, (state, loginData) => {
        return Object.assign({}, state, {
            userId: loginData.userId,
            nickName: loginData.nickName,
            birthday: loginData.birthday,
            income: loginData.income,
            address: loginData.address,
            family: loginData.family
        })
    })