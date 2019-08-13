const routes = require('express').Router();
const LoginController = require('../controllers/login.controller');

routes.post('/login', LoginController.store);
routes.post('/login2', LoginController.login);

module.exports = routes;
