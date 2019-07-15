import { createStore, combineReducers } from 'redux'
import { SeiDocReducer, SeiDocState  } from './reducers/reducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type AppState = {
    state: SeiDocState
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({ state: SeiDocReducer }))

const store = createStore(persistedReducer)

export const persistor = persistStore(store)
export default store