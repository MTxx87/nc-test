import { Request, Response } from 'express'
import db from '../../../db'

type User = {
  name?: string
  email?: string
}

const endpoint = async (req: Request, res: Response) => {
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
}

export default endpoint
