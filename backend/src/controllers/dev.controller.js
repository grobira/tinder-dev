const DevModel = require('../models/dev.model');
const { DevDto } = require('../models/dev.dto');

module.exports = {
  index: async (req, res) => {
    const { login } = req.locals;

    if (!login) {
      return res.status(400).send({
        error: '400 - Bad Parameters',
        message: 'Missing user on header',
      });
    }
    const loggedDev = await DevModel.findOne({ username: login });

    const users = await DevModel.find({
      $and: [
        {
          _id: { $ne: loggedDev._id },
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
