import actionCreatorFactory from 'typescript-fsa'
import { fireStore } from '../firebase/index'

const actionCreator = actionCreatorFactory()

const systemRef = fireStore.collection('system')
export const fetchSystem = () => {
    systemRef.onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.data())
        })
    })
}

export const systemFetch = actionCreator.async('SYSTEM_FETCH')

export const addTags = actionCreator<string>('ADD_TAGS')
export const deleteTags = actionCreator<string>('DELETE_TAGS')