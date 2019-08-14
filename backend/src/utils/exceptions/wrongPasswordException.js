const GenericException = require('./genericException');
class WrongPasswordException extends GenericException {
  constructor() {
    super({
      statusCode: 403,
      message: 'Wrong password',
      details: 'Access denied. User not authentificated',
    });
  }
}

module.exports = WrongPasswordException;
