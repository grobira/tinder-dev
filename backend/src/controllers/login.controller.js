const axios = require('axios');
const DevModel = require('../models/dev.model');
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
};
