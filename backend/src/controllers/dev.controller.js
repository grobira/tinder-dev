const DevModel = require('../models/dev.model');
const { DevDto } = require('../models/dev.dto');

module.exports = {
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
