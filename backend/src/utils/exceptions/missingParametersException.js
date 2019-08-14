const GenericException = require('./genericException');
class MissingParametersException extends GenericException {
  constructor({ details }) {
    super({
      statusCode: 400,
      message: 'Bad Parameters',
      details,
    });
  }
}

module.exports = MissingParametersException;
