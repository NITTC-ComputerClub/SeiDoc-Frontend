import { fireStore, detailPageLogIndex } from './firebase'
import { UserState } from '../reducers/loginReducer'

type detailPageLogData = {
    documentID: string,
    user: UserState
    createdAt: number
}

export const detailPageLogger = (documentID: string, user: UserState) => {
    const logData: detailPageLogData = {
        documentID: documentID,
        user: user,
        createdAt: Date.now()
    }
    console.log('Log: detailPage')
    fireStore.collection(detailPageLogIndex).add(logData)
        .catch((err) => console.error(err))
}

