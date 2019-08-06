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
  .then(data => {
    console.log('Connected to remote database.');
  })
  .catch(err => {
    console.log(err);
    console.error('Failed to connected with remote database');
  });

const server = express();

server.use(cors());
server.use(morgan('dev'));
server.use(express.json());
server.use(routes);

server.listen(3333, () => {
  console.log('Listenning to port 3333.');
});
