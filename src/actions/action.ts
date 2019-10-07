import actionCreatorFactory from 'typescript-fsa'
import algoliasearch from 'algoliasearch';
import { fireStore, algoliaSearchIndex } from '../firebase/firebase';
import { Dispatch } from 'redux'
import { systemIndex } from '../firebase/firebase'
import { System, UserState, TabsState } from '../types/type';
const actionCreator = actionCreatorFactory()

export const fetchSystemByAlgoliaSearchCreator = actionCreator.async<{}, Array<System>>('SYSTEM_FETCH_BY_ALGOLIASEARCH')
export const fetchSystemToComparisonCreator = actionCreator.async<{}, Array<TabsState>>('SYSTEM_FETCH_BY_COMPARSION')
export const deleteSystemsCreator = actionCreator('DELETE_SYSTEMS')

export const getSystemDataByFireStore = async (systems: Array<System>) => {
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
    dispatch(fetchSystemByAlgoliaSearchCreator.started({ params: {} }))

    let algoliaSearchData: Array<System>
    index.search({
        query: query ? query : ' ',
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
                params: {},
                result: system
            }))
        })
    }).catch(err => console.error("error at algoliasearch", err))
}

export const fetchSystemToComparison = (query: string, category: string, region: string) => (dispatch: Dispatch) => {
    console.log('query=', query, 'category=', category, 'region=', region)
    const client = algoliasearch('XW5SXYAQX9', '81fe6c5ab81e766f4ec390f474dde5b9')
    const index = client.initIndex(algoliaSearchIndex)
    dispatch(fetchSystemToComparisonCreator.started({ params: {} }))

    let algoliaSearchData: Array<System>
    index.search({
        query: query ? query : ' ',
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
            const newData: Array<TabsState> = [{ region: region, systems: system }]
            dispatch(fetchSystemToComparisonCreator.done({
                params: {},
                result: newData
            }))
        })
    }).catch(err => console.error("error at algoliasearch", err))
}

export const addTagCreator = actionCreator<string>('ADD_TAG')
export const deleteTagCreator = actionCreator('DELETE_TAG')

export const updateDetailCreator = actionCreator<System>('CHANGE_SYSTEMLIST')

export const loginCreator = actionCreator<UserState>('LOGIN')
export const initLoginCreator = actionCreator('INITLOGIN')