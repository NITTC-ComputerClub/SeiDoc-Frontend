import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

import {  TagReducer } from './reducers/tagReducer';
import {  CategoryButtonReducer } from './reducers/systemsReducer'
import {  DetailReducer } from './reducers/detailReducer'
import { LoginReducer } from './reducers/loginReducer'
import { SystemsState, DetailState, UserState, TagState } from './types/type';

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