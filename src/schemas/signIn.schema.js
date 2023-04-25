import joi from 'joi'

export const signInSchema = joi.object({
    email: joi.string().min(3).required(),
    password: joi.string().min(6).required()
})