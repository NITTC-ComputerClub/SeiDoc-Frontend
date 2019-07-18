import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'
import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import algoliasearch from 'algoliasearch';


const actionCreator = actionCreatorFactory()


export const fetchSystemCreator = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH')
export const fetchSystemByCategoryCreator = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH_BY_CATEGORY')
export const fetchSystemByAlgoliaSearchCreator = actionCreator<any[]>('SYSTEM_FETCH_BY_ALGOLIASEARCH')
export const deleteSystems = actionCreator('DELETE_SYSTEMS')

export const fetchSystem = () => (dispatch: Dispatch<Action<firebase.firestore.DocumentData>>) => {
    console.log('start fetchSystem')
    const systems: firebase.firestore.DocumentData = []
    fireStore.collection('systems').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                systems.push(doc.data())
            })
        })
        .then(() => {
            dispatch(fetchSystemCreator(systems))
        })
}

export const fetchSystemByCategory = (query: string) => (dispatch: Dispatch<Action<firebase.firestore.DocumentData>>) => {
    console.log('start fetchSystem query:', query)
    const searchData: firebase.firestore.DocumentData = []
    fireStore.collection('systems').where('Category', 'array-contains', query).get()
        .then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                    searchData.push(doc.data())
                })
            }).then(() => {
                dispatch(fetchSystemByCategoryCreator(searchData))
            })
}

export const fetchSystemByAlgoliaSearch = (query: string, category: string[]) => (dispatch: Dispatch) => {
    const client = algoliasearch('XW5SXYAQX9','81fe6c5ab81e766f4ec390f474dde5b9')
    const index = client.initIndex('test_firestore')
    index.search({
        query: query,
        facetFilters: category
    },(err, res) => {
        if(err) {
            console.error(err)
            return
        }
        console.log(res)
        dispatch(fetchSystemByAlgoliaSearchCreator(res.hits))

    })

}

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')