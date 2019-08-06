const DevModel = require('../models/dev.model');
const axios = require('axios');

module.exports = {
  store: async (req, res) => {
    const { username } = req.body;

    let dev = await DevModel.findOne({ username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${username}`,
      );
      const { name, bio, avatar_url: avatar } = response.data;

      dev = await DevModel.create({ name, username, avatar, bio });
    }

    return res.json({ data: dev });
  },
  index: async (req, res) => {
    const { user } = req.headers;

    const loggedDev = await DevModel.findById(user);

    const users = DevModel.find({
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

    return res.json({ users });
  },
};