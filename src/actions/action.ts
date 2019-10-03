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

export const fetchSystemByCategory = (category: string, region: string) => (dispatch: Dispatch) => {
    dispatch(fetchSystemByCategoryCreator.started())
    console.log('start fetching System. category:', category)
    let searchData: Array<System> = []
    fireStore.collection(systemIndex).where('Category', 'array-contains', category).get()
        .then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    searchData.push(doc.data() as System)
                })
            }).then(() => {
                console.log(region)
                if (region !== undefined) {
                    searchData = searchData.filter(system => {
                        if (system.Location === region) {
                            return true
                        } else {
                            return false
                        }
                    }).map(system => system)
                }
            }).then(
                () => {
                    console.log(searchData)
                    dispatch(fetchSystemByCategoryCreator.done({
                        params: undefined,
                        result: searchData
                    }))
                }
            )
}

const getSystemDataByFireStore = async (systems: Array<System>) => {
    const promises: Array<Promise<firebase.firestore.DocumentSnapshot>> = []
    for (const system of systems) {
        promises.push(fireStore.collection(systemIndex).doc(system.documentID).get())
    }
    return Promise.all(promises)
}

export const fetchSystemByAlgoliaSearch = (query: string, category: string, region: string) => (dispatch: Dispatch) => {
    console.log('query=', query, 'category=', category, 'region=', region)
    const client = algoliasearch('XW5SXYAQX9', '81fe6c5ab81e766f4ec390f474dde5b9')
    const index = client.initIndex(algoliaSearchIndex)
    dispatch(fetchSystemByAlgoliaSearchCreator.started())

    /* TODO:63行目までの動作いる？*/
    let searchQuery = ' ';
    if (query !== undefined) {
        searchQuery = searchQuery + ' ' + query
    }
    console.log('searchQuery:', searchQuery)
    let algoliaSearchData: Array<System>
    index.search({
        query: searchQuery,
    }).then(res => {
        algoliaSearchData = res.hits as Array<System>
        console.log('res.hits', algoliaSearchData)
        if (region !== undefined) {
            algoliaSearchData = algoliaSearchData.filter(s => (s.Location === region)).map(s => s)
        }
        if (category !== undefined) {
            algoliaSearchData = algoliaSearchData.filter(s => s.Category.includes(category)).map(s => s)
        }
        console.log('result:', algoliaSearchData)
    }).then(() => {
        const system: Array<System> = []
        getSystemDataByFireStore(algoliaSearchData).then(snapshot => {
            snapshot.forEach(s =>
                system.push(s.data() as System)
            )
        }).then(() => {
            dispatch(fetchSystemByAlgoliaSearchCreator.done({
                params: undefined,
                result: system
            }))
        })
    }).catch(err => console.error("error at algoliasearch", err))
}


export const addTagCreator = actionCreator<string>('ADD_TAG')
export const deleteTagCreator = actionCreator('DELETE_TAG')

export const updateDetailCreator = actionCreator<System>('CHANGE_SYSTEMLIST')

export const loginCreator = actionCreator<UserState>('LOGIN')
export const initLoginCreator = actionCreator('INITLOGIN')