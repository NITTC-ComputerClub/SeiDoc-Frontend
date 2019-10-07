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
        console.log('CH', [...state])
        return [...state]
    })
    .case(fetchSystemToComparisonCreator.done, (state: any, fetchData: any) => {
        console.log('CH', [...state, fetchData.result])
        return [...state, fetchData.result]
    })