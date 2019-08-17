import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import { TagState, TagReducer } from './reducers/tagReducer'
import { SystemsState, CategoryButtonReducer } from './reducers/systemsReducer'
import { DetailState, DetailReducer } from './reducers/detailReducer'
import { UserState, LoginReducer } from './reducers/loginReducer'
export type AppState = {
    systemsState: SystemsState
    tagState: TagState
    detailState: DetailState
    userState: UserState
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userState'], 
    blacklist: ['tagState']
}

const persistedReducer = persistReducer(persistConfig,
    combineReducers<AppState>({
        systemsState: CategoryButtonReducer,
        tagState: TagReducer,
        detailState: DetailReducer,
        userState: LoginReducer
    }))

const store = createStore(persistedReducer, {}, applyMiddleware(thunk))

export const persistor = persistStore(store)
//persistor.purge()
export default store