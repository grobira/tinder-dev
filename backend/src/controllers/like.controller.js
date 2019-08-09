const DevModel = require('../models/dev.model');

module.exports = {
  store: async (req, res) => {
    const { devId } = req.params;
    const { user } = req.headers;

    try {
      const [likedDev, loggedDev] = await Promise.all([
        DevModel.findById(devId),
        DevModel.findById(user),
      ]);

      loggedDev.likes.push(likedDev._id);

      await loggedDev.save();

      if (likedDev.likes.includes(loggedDev._id)) {
        console.log('Its a Match!!!');
      }
      return res.json(loggedDev);
    } catch (error) {
      return res.status(404).json({ error: 'User does not exist.' });
    }
  },
};
