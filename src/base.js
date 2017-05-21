import firebase from 'firebase'
import Rebase from 're-base'

const app = firebase.initializeApp({
  apiKey: "AIzaSyB2J6flZ51ZHlYpQ70Qobf2p7TdTTabQjU",
  authDomain: "bitt-book-8438c.firebaseapp.com",
  databaseURL: "https://bitt-book-8438c.firebaseio.com",
  projectId: "bitt-book-8438c",
  storageBucket: "bitt-book-8438c.appspot.com",
  messagingSenderId: "177455455265"
})

const base = Rebase.createClass(app.database())

export default base
