import { signUpSchema} from '../schemas/signUp.schema.js'
import { signInSchema} from '../schemas/signIn.schema.js'
import { usersCollection, sessionsCollection } from '../database/db.js'
import bcrypt from 'bcrypt'

export async function signUpSchemaValidation(req, res, next) {
    const user = req.body
  
    const { error } = signUpSchema.validate(user, { abortEarly: false })
  
    if (error) {
      const errorsMessage = error.details.map(detail => detail.message)
      return res.status(400).send(errorsMessage)
    }
  
    const userExists = await usersCollection.findOne({ email: user.email })
    if (userExists) return res.status(409).send('Esse usuário já foi cadastrado')
  
    res.locals.user = user
  
    next()
  
  }
  
  export async function signInSchemaValidation(req, res, next) {
    const { email, password } = req.body

    const { error } = signInSchema.validate({email,password}, { abortEarly: false })
  
    if (error) {
      const errorsMessage = error.details.map(detail => detail.message)
      return res.status(400).send(errorsMessage)
    }
  
    try {
      const user = await usersCollection.findOne({ email })
  
      if (!user) return res.status(401).send('Acesso negado')
  
      const passwordIsCorrect = bcrypt.compareSync(password, user.password)
  
      if (!passwordIsCorrect) return res.status(401).send('Acesso negado')
  
      res.locals.user = user
    } catch (error) {
      console.error(error)
      res.status(500).send('Houve um problema no servidor, tente novamente mais tarde')
    }
  
    next()
  }
  export async function authRoutesValidation(req, res, next) {
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
  
    if (!token) return res.status(401).send("Acesso negado")
  
    try {
      const session = await sessionsCollection.findOne({ token })
      if (!session) return res.status(401).send("Acesso negado")
  
      const user = await usersCollection.findOne({ _id: session.userId })
  
      if (!user) return res.status(401).send("Acesso negado")
  
      res.locals.user = user
  
    } catch (error) {
      console.erro(error)
      res.status(500).send("Houve um problema no servidor, tente novamente mais tarde")
    }
  
    next()
  
  }