import firebase from 'firebase'

const firebaseConfig = {
	apiKey: 'AIzaSyBMjfEZzpr0kmaqcHfNuKML4TBiYFrXr_I',
	authDomain: 'easyaccomod-3598a.firebaseapp.com',
	projectId: 'easyaccomod-3598a',
	storageBucket: 'easyaccomod-3598a.appspot.com',
	messagingSenderId: '813398836545',
	appId: '1:813398836545:web:0e79209d066091e5970dc0',
	measurementId: 'G-78P2LPW3CF',
}

const app = firebase.initializeApp(firebaseConfig)
const db = app.firestore()
const auth = app.auth()
const storage = app.storage()

export { db, auth, storage }
export default app
