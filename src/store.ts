import { createStore, combineReducers } from 'redux'
import { numReducer, TestState } from './reducers/reducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type AppState = {
    state: TestState
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({ state: numReducer }))

const store = createStore(persistedReducer)

export const persistor = persistStore(store)
export default store