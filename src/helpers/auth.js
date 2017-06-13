import firebase from 'firebase'
import { ref, firebaseAuth } from '../config/base'

export const saveUser = (user) => {
  return ref.child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
}

export const auth = (email, password) => {
  return firebaseAuth().createUserWithEmailAndPassword(email, password)
    .then(saveUser)
}

export const currentUserId = () => {
  const user = firebase.auth().currentUser

  return user.uid
}

export const logout = () => {
  return firebaseAuth().signOut()
}

export const login = (email, password) => {
  return firebaseAuth().signInWithEmailAndPassword(email, password)
}

export const resetPassword = (email) => {
  return firebaseAuth().sendPasswordResetEmail(email)
}
