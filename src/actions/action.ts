import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'
import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'
import { DisplayProperty } from 'csstype';

const actionCreator = actionCreatorFactory()

export const fetchSystemCreator = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH')
export const fetchSystemByCategoryCreator = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH_BY_CATEGORY')

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

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')