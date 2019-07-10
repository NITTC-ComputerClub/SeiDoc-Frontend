import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { init, updateNum, setNum } from '../actions/action'

export interface TestState {
    num: number
}

const initialState: TestState = {
    num: 0
}

export const numReducer = reducerWithInitialState(initialState)
    .case(updateNum, (state) => {
        return { num: state.num + 1 }
    })
    .case(setNum, (state, payload) => {
        return { num: payload }
    })
    .case(init, () => {
        return { num: 0 }
    })