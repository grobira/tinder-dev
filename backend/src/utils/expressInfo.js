const listExpressEndpoints = require('express-list-endpoints');
const chalk = require('chalk');

const expressInfo = app => {
  const expressRoutes = listExpressEndpoints(app);
  console.log(
    chalk.yellow('Server running on port:\t'),
    chalk.green(`${process.env.PORT || 3333}`),
  );
  console.log(chalk.yellow('Server routes:'));
  expressRoutes.forEach(route => {
    route.methods.forEach(method => {
      console.log(chalk.green(`\t[${method}]\t${route.path}`));
    });
  });
};

module.exports = expressInfo;
