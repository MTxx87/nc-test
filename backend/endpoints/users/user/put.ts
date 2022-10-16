import { Request, Response } from 'express'
import db from '../../../db'
import { User } from '../../../interfaces'

type PutParams = {
  id: string
}

const endpoint = async (
  req: Request<PutParams, User, User>,
  res: Response<User>,
) => {
  try {
    const id = req.params.id
    const user = req.body
    const userRef = db.collection('users').doc(id)
    console.log(user)
    await userRef.set(user, { merge: true })
    const doc = await userRef.get()
    res.json(doc.data() as User)
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}

export default endpoint
