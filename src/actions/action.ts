import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'
import { Dispatch } from 'redux'
import { tsThisType } from '@babel/types';

const actionCreator = actionCreatorFactory()

export const systemFetch = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH')

const systemRef = fireStore.collection('system')
export const fetchSystem = () => (dispatch: Dispatch) => {
    console.log('OK1')
    const systems: firebase.firestore.DocumentData = []
    fireStore.collection('systems').get()
        .then((snapshot: any) => {
            snapshot.forEach((doc: any) => {
                systems.push(doc.data())
                console.log(doc.data())
            })
        })
        .then(() => {
            dispatch(systemFetch(systems))
        })
}

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')