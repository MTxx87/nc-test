import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import * as express from 'express'

dotenv.config()

let credential
if (process.env.NODE_ENV === 'development') {
  const serviceAccount = require('./key.json')
  credential = cert(serviceAccount)
} else {
  credential = applicationDefault()
}

initializeApp({
  credential,
})

const PORT = process.env.PORT || 8080
const db = getFirestore()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('🎉 Server up and running! 🎉')
})

app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    const userRef = db.collection('users').doc(id)
    const doc = await userRef.get()
    if (doc.exists) {
      let data = doc.data()
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
})

type User = {
  name?: string
  email?: string
}

app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const body = req.body

    const data: User = {}

    if (body.name) {
      data.name = body.name
    }
    if (body.email) {
      data.email = body.email
    }

    const userRef = db.collection('users').doc(id)
    const result = await userRef.set(data, { merge: true })
    res.json(result)
  } catch (error) {
    res.sendStatus(500)
  }
})

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = server
