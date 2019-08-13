const routes = require('express').Router();
const LoginController = require('../controllers/login.controller');

routes.post('/login', LoginController.store);

module.exports = routes;
