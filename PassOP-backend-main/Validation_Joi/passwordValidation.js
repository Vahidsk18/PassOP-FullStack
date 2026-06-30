const Joi = require('joi');


const PasswordSchema = Joi.object({

    website: Joi.string().required().trim(),
    username: Joi.string().trim().required().min(1),
    password: Joi.string().min(1).required()
})
module.exports = { PasswordSchema };