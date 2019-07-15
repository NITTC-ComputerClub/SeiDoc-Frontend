import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { systemFetch, System } from '../actions/action'

export interface SystemState<T> {
    data: T
    loading?: boolean
    error?: any
}

export interface State {
    all: SystemState<System[]>
}

const initialState: State = {
    all: {
        data: [],
        loading: false
    }
}

export const SystemReducer = reducerWithInitialState(initialState)
    .case(systemFetch.loadSystem.started, (state, payload) => {
        return {
            ...state,
            all: {
                data: [],
                loading: true
            }
        }
    })
    .case(systemFetch.loadSystem.done, (state, payload) => {
        return{
            ...state,
            all: {
                data: payload.result,
                loading: false
            }
        }
    })
    .case(systemFetch.loadSystem.failed,(state,payload)=>{
        return{
            ...state,
            all:{
                data:[],
                loading:false,
                error:payload.error
            }
        }
    })