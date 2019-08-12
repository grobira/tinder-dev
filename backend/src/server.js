const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

mongoose
  .connect(
    'mongodb+srv://grobira:KDkFTb7h0KwzlTX3@remotemongo-wtm1e.mongodb.net/omnistack8?retryWrites=true&w=majority',
    { useNewUrlParser: true },
  )
  .then(() => {
    console.log('Connected to remote database.');
  })
  .catch(err => {
    console.log(err);
    console.error('Failed to connected with remote database');
  });

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
  console.log('Listenning to port 3333.');
});
