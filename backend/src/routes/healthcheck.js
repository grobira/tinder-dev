const routes = require('express').Router();

routes.get('/healthcheck', (req, res) => {
  res.json({ status: 'Alive' });
});

module.exports = routes;
