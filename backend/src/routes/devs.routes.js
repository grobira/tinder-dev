const routes = require('express').Router();
const DevController = require('../controllers/dev.controller');
const LikeController = require('../controllers/like.controller');
const DislikeController = require('../controllers/dislike.controller');
const { verifyJwtMiddleware } = require('../utils/auth');

routes
  .get('/devs', verifyJwtMiddleware, DevController.index)
  .post('/devs/:devId/likes', verifyJwtMiddleware, LikeController.store)
  .post('/devs/:devId/dislikes', verifyJwtMiddleware, DislikeController.store);

module.exports = routes;
