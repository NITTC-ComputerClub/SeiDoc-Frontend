import { createStore, combineReducers } from 'redux'
import { TagsReducer, TagsState  } from './reducers/tagsReducer'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export type AppState = {
    tags: TagsState
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({ tags: TagsReducer }))

const store = createStore(persistedReducer)

export const persistor = persistStore(store)
persistor.purge()
export default store