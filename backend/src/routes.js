const routes = require('express').Router();
const DevController = require('./controllers/dev.controller');
const LikeController = require('./controllers/like.controller');
const DislikeController = require('./controllers/dislike.controller');

routes.get('/devs', DevController.index);

routes.post('/devs', DevController.store);

routes.post('/devs/:devId/likes', LikeController.store);

routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;
