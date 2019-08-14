const errorHandler = (error, req, res, next) => {
  const {
    statusCode = 500,
    message = 'A generic error occurred',
    details = {},
  } = error;

  res.status(statusCode).send({
    statusCode,
    message,
    details,
  });
};

module.exports = { errorHandler };
