import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'
import { Dispatch } from 'redux'

const actionCreator = actionCreatorFactory()

export const systemFetch = actionCreator<firebase.firestore.DocumentData>('SYSTEM_FETCH')

const systemRef = fireStore.collection('system')
export const fetchSystem = () => (dispatch: Dispatch) => {
    console.log('OK')
    const systems: firebase.firestore.DocumentData = []
    systemRef.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            systems.push(doc.data())
        })
    })
    console.log(systems)
    dispatch(systemFetch(systems))
}

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')