import firebase from 'firebase'
import firebaseConfig from './config'
import { System } from '../reducers/systemsReducer';
import { UserState } from '../reducers/loginReducer';

firebase.initializeApp(firebaseConfig)

export const fireStore = firebase.firestore()
export const auth = firebase.auth()
export const systemIndex = 'testData'
export const detailPageLogIndex = 'detailPageLog'
export const popularPageIndex = 'popularSystem'

export type logType = {
    createdAt: number;
    documentID: string;
    system: System;
    user: UserState;
  };

export type rankingType = {
  documentID: string,
  systemName: string,
  systemLocation: string,
  count: number
}
