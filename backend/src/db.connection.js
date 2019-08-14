const mongoose = require('mongoose');

module.exports = (() => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASS
      }@remotemongo-wtm1e.mongodb.net/tindev?retryWrites=true&w=majority`,
      { useCreateIndex: true, useNewUrlParser: true },
    )
    .catch(err => {
      console.log(err);
      console.error('Failed to connected with remote database');
    });

  mongoose.connection.on('connected', () => {
    console.log('Connected to remote database.');
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from remote database.');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('reconnected to remote database.');
  });
})();
