import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import * as dotenv from 'dotenv'
dotenv.config()

let credential
if (process.env.NODE_ENV === 'development') {
  const serviceAccount = require('../key.json')
  credential = cert(serviceAccount)
} else {
  credential = applicationDefault()
}

initializeApp({
  credential,
})

const db = getFirestore()

export default db
