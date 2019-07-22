import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { TagState, TagReducer } from './reducers/tagReducer'
import { SystemsState, CategoryButtonReducer } from './reducers/systemsReducer'

export type AppState = {
    systems: SystemsState
    tagstate: TagState
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        systems: CategoryButtonReducer,
        tagstate: TagReducer
    }))

const store = createStore(persistedReducer, {}, applyMiddleware(thunk))

export const persistor = persistStore(store)
persistor.purge()
export default store