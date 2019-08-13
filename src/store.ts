import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { TagState, TagReducer } from './reducers/tagReducer'
import { SystemsState, CategoryButtonReducer } from './reducers/systemsReducer'
import { SelectSystemsState, SelectSystemReducer } from './reducers/selectsystemReducer'
import { UserState, LoginReducer } from './reducers/loginReducer'
export type AppState = {
    systemsState: SystemsState
    tagState: TagState
    selectsystemState: SelectSystemsState
    userState: UserState
}

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        systemsState: CategoryButtonReducer,
        tagState: TagReducer,
        selectsystemState: SelectSystemReducer,
        userState: LoginReducer
    }))

const store = createStore(persistedReducer, {}, applyMiddleware(thunk))

export const persistor = persistStore(store)
//persistor.purge()
export default store