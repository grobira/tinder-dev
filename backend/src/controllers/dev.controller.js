const DevModel = require('../models/dev.model');
const axios = require('axios');
const { DevDto } = require('../models/dev.dto');

module.exports = {
  store: async (req, res) => {
    let { username } = req.body;
    if (!username) {
      return res.status(400).send({
        error: '400 - Bad Parameters',
        message: 'Missing username on body',
      });
    }
    username = username.trim();
    let dev = await DevModel.findOne({ username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      const { name, bio, avatar_url: avatar } = response.data;

      dev = await DevModel.create({ name, username, avatar, bio });
    }

    return res.json(DevDto(dev));
  },
  index: async (req, res) => {
    const { user } = req.headers;

    if (!user) {
      return res.status(400).send({
        error: '400 - Bad Parameters',
        message: 'Missing user on header',
      });
    }
    const loggedDev = await DevModel.findById(user);

    const users = await DevModel.find({
      $and: [
        {
          _id: { $ne: user },
        },
        {
          _id: { $nin: loggedDev.likes },
        },
        {
          _id: { $nin: loggedDev.dislikes },
        },
      ],
    });

    return res.json(users.map(DevDto));
  },
};
