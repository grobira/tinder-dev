const devsRoutes = require('./devs.routes');
const healthcheckRoutes = require('./healthcheck');
const loginRoutes = require('./login.routes');

module.exports = [devsRoutes, healthcheckRoutes, loginRoutes];
