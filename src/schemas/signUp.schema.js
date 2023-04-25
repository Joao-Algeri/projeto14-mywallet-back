import joi from 'joi'

export const signUpSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().min(6).required(),
    password: joi.string().min(6).required()
})