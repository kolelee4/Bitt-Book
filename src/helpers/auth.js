import firebase from 'firebase'
import {ref, firebaseAuth} from '../config/base'

export function auth(email, password) {
  return firebaseAuth().createUserWithEmailAndPassword(email, password)
    // eslint-disable-next-line
    .then((saveUser))
}

export function saveUser(user) {
  return ref.child(`users/${user.uid}/info`)
    .set({
      displayName: localStorage.getItem(`${user.email}-display-name`),
      email:       user.email,
      uid:         user.uid
    })
    .then(() => {
      user.updateProfile({
        displayName: localStorage.getItem(`${user.email}-display-name`)
      })
    })
    .then(() => user)
}

export function getCurrentUser() {
  return firebase.auth().currentUser
}

export function logout() {
  return firebaseAuth().signOut()
}

export function login(email, password) {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
    .then(() => {
      localStorage.setItem(`${email}-display-name`, getCurrentUser().displayName)
    })
}

export function resetPassword(email) {
  return firebaseAuth().sendPasswordResetEmail(email)
}
