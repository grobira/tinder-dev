const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const expressInfo = require('./utils/expressInfo');
const { errorHandler } = require('./utils/errorHandler');
require('./db.connection');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', socket => {
  const { user } = socket.handshake.query;
  console.log(`Caching socket ${user} ${socket.id}`);
  connectedUsers[user] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);
app.use(errorHandler);

server.listen(process.env.PORT || 3333, () => {
  expressInfo(app);
});
