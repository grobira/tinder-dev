const routes = require('express').Router();
const DevController = require('./controllers/dev.controller');
const LikeController = require('./controllers/like.controller');
const DislikeController = require('./controllers/dislike.controller');
const { verifyJwtMiddleware } = require('./utils/auth');

routes.post('/devs', DevController.store);

routes.get('/healthcheck', (req, res) => {
  res.json({ status: 'Alive' });
});

routes
  .use(verifyJwtMiddleware)
  .get('/devs', DevController.index)
  .post('/devs/:devId/likes', LikeController.store)
  .post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;
