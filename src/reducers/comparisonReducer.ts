import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { fetchSystemToComparisonCreator, initComparisonCreator } from '../actions/action'
import { TabsState } from '../types/type'

const initialState: Array<TabsState> = []

export const ComparisonReducer = reducerWithInitialState(initialState)
    .case(fetchSystemToComparisonCreator.started, (state) => {
        return Array.from(state)
    })
    .case(fetchSystemToComparisonCreator.done, (state: Array<TabsState>, fetchData) => {
        const fetchFlag = state.some((value: TabsState) => { return JSON.stringify(value) === JSON.stringify(fetchData.result[0]) })
        if (fetchFlag) return state
        else {
            const regionFlag = state.some((value: TabsState) => { return value.region === fetchData.result[0].region })
            if (regionFlag) {
                for (let i = 0; i < state.length; i++) {
                    if (state[i].region === fetchData.result[0].region) {
                        state.splice(i, 1, fetchData.result[0])
                    }
                }
                console.log('CH', state)
                return Array.from(state)
            }
            else return state.concat(fetchData.result)
        }
    })
    .case(initComparisonCreator, () => {
        return Array.from([])
    })