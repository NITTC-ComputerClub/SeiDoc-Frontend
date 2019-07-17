import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { TagsReducer, TagsState } from './reducers/tagsReducer'
import { FetchData, CategoryButtonReducer} from './reducers/categorysReducer'

export type AppState = {
    tags: TagsState
    systems: FetchData
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        tags: TagsReducer,
        systems: CategoryButtonReducer
    }))

const store = createStore(persistedReducer, {}, applyMiddleware(thunk))

export const persistor = persistStore(store)
persistor.purge()
export default store