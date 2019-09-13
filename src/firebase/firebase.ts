import firebase from 'firebase'
import firebaseConfig from './config'
firebase.initializeApp(firebaseConfig)

export const fireStore = firebase.firestore()
export const auth = firebase.auth()
export const systemIndex = 'systems'
export const algoliaSearchIndex = 'systems'
export const detailPageLogIndex = 'detailPageLog'
export const popularPageIndex = 'popularSystem'
export const searchLogIndex = 'searchLog'


