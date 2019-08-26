import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loginCreator, initLoginCreator } from '../actions/action'
import { UserState } from '../types/type';



const initialState: UserState = {
    userId: '',
    nickName: '',
    birthday: '',
    income: '',
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
    .case(initLoginCreator, (state) => {
        return Object.assign({}, state, {
            userId: '',
            nickName: '',
            birthday: '',
            income: '',
            address: '',
            family: ''
        })
    })