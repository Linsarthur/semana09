import Joi from "joi"

//validação para a inserção/atualização de um contato

export const contatoValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    sobrenome: Joi.string().max(150),
    email: Joi.string().email(),
    telefone: Joi.string().required(),
    observacaoes: Joi.string().max(100),
     favorito: Joi.boolean()
})

export const usuarioValidation = Joi.object({
    nome: Joi.string().max(150).required(),
    email: Joi.string().email(),
    senha: Joi.string().required()
})