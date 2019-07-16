import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { TagsReducer, TagsState } from './reducers/tagsReducer'

export type AppState = {
    tags: TagsState
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        tags: TagsReducer
    }))

const store = createStore(persistedReducer, applyMiddleware(thunk))

export const persistor = persistStore(store)
persistor.purge()
export default store