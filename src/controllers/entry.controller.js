import { registryCollection } from '../database/db.js'
import {sessionsCollection} from '../database/db.js'

export async function newEntry(req, res) {
    const entry = res.locals.entry
  
    try {
      await registryCollection.insertOne(entry)
      res.status(201).send("Transação efetuada com sucesso")
    } catch (error) {
      console.error(error)
      res.status(500).send("Houve um problema no servidor, tente novamente mais tarde")
    }
  
  }

  export async function getRegistry(req, res) {

    const user = res.locals.user

  try {
    const transactions = await transactionsCollection.find({ user: user._id }).toArray()

    delete user.password

    res.send({ transactions, user })
  } catch (error) {
    console.error(error)
    res.status(500).send("Houve um problema no servidor, tente novamente mais tarde")
  }
}