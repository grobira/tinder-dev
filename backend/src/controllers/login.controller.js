const { createJwtToken } = require('../utils/auth');
const UserModel = require('../models/user.model');
const DevModel = require('../models/dev.model');
const { DevDto } = require('../models/dev.dto');
const bcrypt = require('bcrypt');
const axios = require('axios');
const {
  WrongPasswordException,
  MissingParametersException,
} = require('../utils/exceptions');

module.exports = {
  login: async (req, res, next) => {
    const { login, password } = req.body;

    if (!login || !password) {
      return next(
        new MissingParametersException({
          details: 'Missing login or password',
        }),
      );
    }

    if (validatePassword(password)) {
      const exist = await UserModel.findOne({ login });

      if (exist) {
        try {
          await comparePassword(password, exist.password);
          const token = createJwtToken({ login, password });
          return res.json({ result: 'User logged', token });
        } catch (err) {
          return next(err);
        }
      } else {
        createDev(login);
        await UserModel.create({ login, password });
        const token = createJwtToken({ login, password });
        return res.json({ result: 'User successfully added', token });
      }
    }
  },
};

const validatePassword = password => {
  return true;
};

const createDev = async username => {
  let dev = await DevModel.findOne({ username });

  if (!dev) {
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
    );
    const { name, bio, avatar_url: avatar } = response.data;

    dev = await DevModel.create({ name, username, avatar, bio });
  }

  return DevDto(dev);
};

const comparePassword = (candidatePassword, userPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, userPassword).then(isMatch => {
      isMatch ? resolve() : reject(new WrongPasswordException());
    });
  });
};
