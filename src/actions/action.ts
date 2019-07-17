import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'
import { Action } from 'typescript-fsa'
import { Dispatch } from 'redux'

const actionCreator = actionCreatorFactory()

export const systemFetch = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH')

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
            dispatch(systemFetch(systems))
        })
}

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')