const express = require('express')

const OngController = require('./controllers/OngController')

const IncidentController = require('./controllers/IncidentController')

const ProfileController = require('./controllers/ProfileController')

const SessionController = require('./controllers/SessionController')

const routes = express.Router()


// Lista Todas as ONGs
routes.get('/ongs', OngController.index)
// Cadastrar as ONGs
routes.post('/ongs', OngController.create)

//Login
routes.post('/sessions', SessionController.create)

// Lista Incidents
routes.get('/incidents', IncidentController.index)
// Cadastrar Incidents
routes.post('/incidents', IncidentController.create)
// Deletar cadastro
routes.delete('/incidents/:id', IncidentController.delete)

// Listar Incidents Especificos
routes.get('/profile', ProfileController.index)


module.exports = routes