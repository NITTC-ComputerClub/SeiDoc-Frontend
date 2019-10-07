import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemToComparisonCreator } from '../actions/action'
import { TabsState } from '../types/type'

type fetchDataType = {
    params?: undefined
    result: Array<TabsState>
}

const initialState: Array<TabsState> = []

export const ComparisonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemToComparisonCreator.started, (state) => {
        return [...state]
    })
    .case(fetchSystemToComparisonCreator.done, (state: Array<TabsState>, fetchData: any) => {
        console.log('CH', [...state].concat(fetchData.result))
        return state.concat(fetchData.result)
    })