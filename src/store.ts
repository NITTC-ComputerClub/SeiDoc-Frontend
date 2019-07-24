import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { TagState, TagReducer } from './reducers/tagReducer'
import { SystemsState, CategoryButtonReducer } from './reducers/systemsReducer'
import { SelectSystemsState, SelectSystemReducer} from './reducers/selectsystemReducer'

export type AppState = {
    systemsState: SystemsState
    tagState: TagState
    selectsystemState: SelectSystemsState
}

const persistConfig = {
    key: 'root',
    storage,
    whiteList: ['AppState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        systemsState: CategoryButtonReducer,
        tagState: TagReducer,
        selectsystemState: SelectSystemReducer
    }))

const store = createStore(persistedReducer, {}, applyMiddleware(thunk))

export const persistor = persistStore(store)
persistor.purge()
export default store