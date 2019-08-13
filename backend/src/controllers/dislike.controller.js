const DevModel = require('../models/dev.model');
const { DevDto } = require('../models/dev.dto');

module.exports = {
  store: async (req, res) => {
    const { devId } = req.params;
    const { user } = req.headers;

    if (!devId || !user) {
      return res.status(400).send({
        error: '400 - Bad Parameters',
        message: 'Missing devId param or user on header',
      });
    }

    try {
      const [dislikedDev, loggedDev] = await Promise.all([
        DevModel.findById(devId),
        DevModel.findById(user),
      ]);
      loggedDev.dislikes.push(dislikedDev._id);

      await loggedDev.save();

      return res.json(DevDto(loggedDev));
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: 'User does not exist.' });
    }
  },
};
