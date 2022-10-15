import * as dotenv from 'dotenv'
import * as express from 'express'

import getUser from './endpoints/users/user/get'
import putUser from './endpoints/users/user/put'

dotenv.config()
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.send('🎉 Server up and running! 🎉')
})

app.get('/users/:id', getUser)
app.put('/users/:id', putUser)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

module.exports = server
