import db from '../../../db'

const endpoint = async (req, res) => {
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
}

export default endpoint
