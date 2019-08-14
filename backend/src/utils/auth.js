const jwt = require('jsonwebtoken');

function createJwtToken({ login, pass }) {
  const token = jwt.sign(
    {
      data: { login, pass },
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 3600,
      algorithm: 'HS256',
    },
  );

  return token;
}

function verifyJwt(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded) {
        reject(err);
      }
      resolve(decoded);
    });
  });
}

function verifyJwtMiddleware(req, res, next) {
  const token = req.headers.authorization;

  verifyJwt(token)
    .then(decodedToken => {
      req.locals = decodedToken.data;
      next();
    })
    .catch(err => {
      res.status(401).json({ message: 'Invalid auth token provided.' });
    });
}

module.exports = { verifyJwtMiddleware, createJwtToken };
