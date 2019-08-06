const { devModel } = require('../models/dev.model');

module.exports = {
  store: async (req, res) => {
    const { devId } = req.params;
    const { user } = req.headers;

    try {
      const [dislikedDev, loggedDev] = await Promise.all([
        devModel.findById(devId),
        devModel.findById(user),
      ]);

      loggedDev.dislikes.push(dislikedDev._id);

      await devModel.save();
    } catch (error) {
      return res.status(404).json({ error: 'User does not exist.' });
    }
    return res.json(loggedDev);
  },
};
