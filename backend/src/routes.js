const express = require('express');
const ongscontroller = require('./controllers/ongscontrollers');
const incidentscontroller = require('./controllers/incidentescontrollers');
const profilecontroller = require('./controllers/profilecontroller');
const sessioncontroller = require('./controllers/sessioncontroller');

const routes = express.Router();

routes.get('/ongs', ongscontroller.index);
routes.get('/profile', profilecontroller.index);
routes.post('/ongs', ongscontroller.create);

routes.post('/sessions', sessioncontroller.create);

routes.post('/incidents', incidentscontroller.create);
routes.get('/incidents', incidentscontroller.index);
routes.delete('/incidents/:id', incidentscontroller.delete);

module.exports = routes;