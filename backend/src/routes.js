const express = require('express')

const { celebrate, Segments, Joi} = require('celebrate')
 
const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')

const ProfileController = require('./controllers/ProfileController')

const SessionController = require('./controllers/SessionController')

const routes = express.Router()

//Login
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id:          Joi.string().required(),
    })
}), SessionController.create)

// Lista Todas as ONGs
routes.get('/ongs', OngController.index)

// Cadastrar as ONGs
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name:        Joi.string().required(),
        email:       Joi.string().required().email(),
        whatsapp:    Joi.string().required().min(10).max(11),
        city:        Joi.string().required(),
        uf:          Joi.string().required().length(2),
    })
}), OngController.create)

// Lista Incidents
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
       page:          Joi.number(), 
    })
}),IncidentController.index)


// Cadastrar Incidents
routes.post('/incidents',  celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization:  Joi.string().required(),
    }).unknown(),

    [Segments.BODY]:    Joi.object().keys({
        title:          Joi.string().required(),
        description:    Joi.string().required(),
        value:          Joi.number().required(),
    })
}), IncidentController.create)


// Deletar cadastro
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id:            Joi.number().required(),
    })
}), IncidentController.delete)

// Listar Incidents Especificos
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization:  Joi.string().required(),
    }).unknown()
}), ProfileController.index)


module.exports = routes