import dayjs from 'dayjs'
import { entrySchema } from '../schemas/entry.schema.js'

export function entrySchemaValidation(req, res, next) {
    const { value, description, type } = req.body
    const user = res.locals.user
  
    const entry = {
      value,
      description,
      type,
      user: user._id,
      date: dayjs().format("DD/MM")
    }
  
    const { error } = entrySchema.validate(entry, { abortEarly: false })
  
    if (error) {
      const errorMessages = error.details.map(detail => detail.message)
      return res.status(400).send(errorMessages)
    }
  
    res.locals.entry = entry
  
    next()
  
  }
  