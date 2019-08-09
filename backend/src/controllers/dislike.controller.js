const DevModel = require('../models/dev.model');

module.exports = {
  store: async (req, res) => {
    const { devId } = req.params;
    const { user } = req.headers;

    try {
      const [dislikedDev, loggedDev] = await Promise.all([
        DevModel.findById(devId),
        DevModel.findById(user),
      ]);
      loggedDev.dislikes.push(dislikedDev._id);

      await loggedDev.save();

      return res.json(loggedDev);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: 'User does not exist.' });
    }
  },
};
