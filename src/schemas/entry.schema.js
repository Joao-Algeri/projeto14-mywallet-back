import joi from 'joi'

export const entrySchema = joi.object({
    value: joi.number().required(),
    description: joi.string().required().min(10),
    type: joi.string().valid("deposit", "withdraw").required(),
    user: joi.object().required(),
    date: joi.string().required()
})