// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp, applicationDefault, cert } from 'firebase-admin/app'
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

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = server
