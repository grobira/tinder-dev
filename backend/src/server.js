const express = require('express');
const routes = require('./routes');
const morgan = require('morgan');
const cors = require('cors');
const expressInfo = require('./utils/expressInfo');
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

server.listen(3333, () => {
  expressInfo(app);
});
