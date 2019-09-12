import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { loginCreator, initLoginCreator } from '../actions/action'
import { UserState } from '../types/type';



const initialState: UserState = {
    userId: '',
    nickName: '',
    birthday: '',
    income: '',
    address: '',
    family: '',
    isAdmin: false,
    city: '',  
    department: '',
    sex: 'None',
    searchedWords: [],
    viewedCategory: [{categoryName:'子育て',count:0}],
}


export const LoginReducer = reducerWithInitialState(initialState)
    .case(loginCreator, (state, loginData) => {
        return Object.assign({}, state, {
            userId: loginData.userId,
            nickName: loginData.nickName,
            birthday: loginData.birthday,
            income: loginData.income,
            address: loginData.address,
            family: loginData.family,
            city: loginData.city,
            department: loginData.department
        })
    })
    .case(initLoginCreator, (state) => {
        return Object.assign({}, state, {
            userId: '',
            nickName: '',
            birthday: '',
            income: '',
            address: '',
            family: '',
            city: '',
            department: ''
        })
    })