import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'
import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import algoliasearch from 'algoliasearch';
import { System } from '../reducers/systemsReducer'

const actionCreator = actionCreatorFactory()



export const fetchSystemCreator = actionCreator<Array<System>>('SYSTEM_FETCH')
export const fetchSystemByCategoryCreator = actionCreator<Array<System>>('SYSTEM_FETCH_BY_CATEGORY')
export const fetchSystemByAlgoliaSearchCreator = actionCreator<Array<System>>('SYSTEM_FETCH_BY_ALGOLIASEARCH')
export const deleteSystems = actionCreator('DELETE_SYSTEMS')

export const fetchSystem = () => (dispatch: Dispatch<Action<Array<System>>>) => {
    console.log('start fetchSystem')
    const searchData: Array<System> = []
    fireStore.collection('systems').get()
        .then((snapshot ) => {
            snapshot.forEach((doc ) => {
                searchData.push(doc.data() as System)
            })
        })
        .then(() => {
            dispatch(fetchSystemCreator(searchData))
        })
}

export const fetchSystemByCategory = (query: string) => (dispatch: Dispatch<Action<Array<System>>>) => {
    console.log('start fetchSystem query:', query)
    const searchData: Array<System> = []
    fireStore.collection('systems').where('Category', 'array-contains', query).get()
        .then(
            (snapshot) => {
                snapshot.forEach((doc) => {
                searchData.push(doc.data() as System)
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
        dispatch(fetchSystemByAlgoliaSearchCreator(res.hits as Array<System>))

    })
}

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')