import actionCreatorFactory from 'typescript-fsa'
import algoliasearch from 'algoliasearch';
import { fireStore, algoliaSearchIndex } from '../firebase/firebase';
import { Dispatch } from 'redux'
import { systemIndex } from '../firebase/firebase'
import { System, UserState } from '../types/type';
const actionCreator = actionCreatorFactory()

export const fetchSystemByCategoryCreator = actionCreator.async<undefined, Array<System>, undefined>('SYSTEM_FETCH_BY_CATEGORY')
export const fetchSystemByAlgoliaSearchCreator = actionCreator.async<undefined, Array<System>, undefined>('SYSTEM_FETCH_BY_ALGOLIASEARCH')
export const deleteSystemsCreator = actionCreator('DELETE_SYSTEMS')

export const fetchSystemByCategory = (query: string) => (dispatch: Dispatch) => {
    dispatch(fetchSystemByCategoryCreator.started())
    console.log('start fetchSystem query:', query)
    const searchData: Array<System> = []
    fireStore.collection(systemIndex).where('Category', 'array-contains', query).get()
        .then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    searchData.push(doc.data() as System)
                })
            }).then(() => {
                dispatch(fetchSystemByCategoryCreator.done({
                    params: undefined,
                    result: searchData
                }))
            })
}

export const fetchSystemByAlgoliaSearch = (query: string, category: string) => (dispatch: Dispatch) => {
    const client = algoliasearch('XW5SXYAQX9', '81fe6c5ab81e766f4ec390f474dde5b9')
    const index = client.initIndex(algoliaSearchIndex)
    dispatch(fetchSystemByAlgoliaSearchCreator.started())
    index.search({
        query: query,
        facetFilters: [category]
    }, (err, res) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(res)
        const systemData  = res.hits as Array<System>
        const system : Array<System> = []
        
        systemData.forEach(eachSysten => { 
            fireStore.collection(systemIndex).where('documentID', '==', eachSysten.documentID).get().then(
                snapshot =>  snapshot.forEach(doc => {
                    console.log("firebase: ", doc.data())
                    system.push(doc.data() as System)
                })
            )
        })
        dispatch(fetchSystemByAlgoliaSearchCreator.done({
            params: undefined,
            result: system
        }))

    })
}

export const addTagCreator = actionCreator<string>('ADD_TAG')
export const deleteTagCreator = actionCreator('DELETE_TAG')

export const updateDetailCreator = actionCreator<System>('CHANGE_SYSTEMLIST')

export const loginCreator = actionCreator<UserState>('LOGIN')
export const initLoginCreator = actionCreator('INITLOGIN')