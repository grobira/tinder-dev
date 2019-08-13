const mongoose = require('mongoose');

module.exports = (() => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.MONGO_USER}:${
        process.env.MONGO_PASS
      }@remotemongo-wtm1e.mongodb.net/omnistack8?retryWrites=true&w=majority`,
      { useNewUrlParser: true },
    )
    .then(() => {
      console.log('Connected to remote database.');
    })
    .catch(err => {
      console.log(err);
      console.error('Failed to connected with remote database');
    });
})();
