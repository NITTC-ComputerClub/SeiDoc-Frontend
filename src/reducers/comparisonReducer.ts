import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemToComparisonCreator } from '../actions/action'
import { TabsState } from '../types/type'

const initialState: Array<TabsState> = []

export const ComparisonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemToComparisonCreator.started, (state) => {
        return [...state]
    })
    .case(fetchSystemToComparisonCreator.done, (state: Array<TabsState>, fetchData) => {
        return [...state].concat(fetchData.result)
    })