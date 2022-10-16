// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
//@ts-ignore
import ReactObserver from 'react-event-observer'

import { getAuth, User } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAisJCO0FehB85AOKi9SfkstQFlqetOS2M',
  authDomain: 'charming-sonar-365507.firebaseapp.com',
  projectId: 'charming-sonar-365507',
  storageBucket: 'charming-sonar-365507.appspot.com',
  messagingSenderId: '582651248922',
  appId: '1:582651248922:web:1057236fc3c7878428eca3',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const firebaseObserver = ReactObserver()

auth.onAuthStateChanged(function (user) {
  firebaseObserver.publish('authStateChanged', loggedIn())
})

export function loggedIn(): User | null {
  return auth.currentUser
}

export default app
