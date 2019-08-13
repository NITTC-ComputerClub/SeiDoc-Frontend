import { fireStore, detailPageLogIndex } from './firebase'
import { UserState } from '../reducers/loginReducer'
import { System } from '../reducers/systemsReducer';

type detailPageLogData = {
    documentID: string,
    system: System
    user: UserState
    createdAt: number
}

export const detailPageLogger = (documentID: string, user: UserState, system: System) => {
    const logData: detailPageLogData = {
        documentID: documentID,
        system: system,
        user: user,
        createdAt: Date.now()
    }
    console.log('Log: detailPage')
    fireStore.collection(detailPageLogIndex).add(logData)
        .catch((err) => console.error(err))
}

