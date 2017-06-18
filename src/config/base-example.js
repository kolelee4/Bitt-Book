import firebase from 'firebase'
import Rebase from 're-base'

const app = firebase.initializeApp({
  apiKey:            '<apiKey>',
  authDomain:        '<authDomain>',
  databaseURL:       '<databaseURL>',
  projectId:         '<projectId>',
  storageBucket:     '<storageBucket>',
  messagingSenderId: '<messagingSenderId>'
})

export const firebaseAuth = firebase.auth
export const ref = firebase.database().ref()
export const base = Rebase.createClass(app.database())
