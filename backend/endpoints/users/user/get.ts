import db from '../../../db'
import { Request, Response } from 'express'
import { User } from '../../../interfaces'

type GetParams = {
  id: string
}

const endpoint = async (req: Request<GetParams>, res: Response<User>) => {
  try {
    const id = req.params.id
    const userRef = db.collection('users').doc(id)
    const doc = await userRef.get()
    if (doc.exists) {
      let data = doc.data() as User
      res.json(data)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    res.sendStatus(500)
    console.log(error)
  }
}

export default endpoint
