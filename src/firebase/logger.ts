import { fireStore, detailPageLogIndex } from './firebase'
import { detailPageLogData, UserState, System } from '../types/type';
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

