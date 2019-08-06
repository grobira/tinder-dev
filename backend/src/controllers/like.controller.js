const { devModel } = require('../models/dev.model');

module.exports = {
  store: async (req, res) => {
    const { devId } = req.params;
    const { user } = req.headers;

    try {
      const [likedDev, loggedDev] = await Promise.all([
        devModel.findById(devId),
        devModel.findById(user),
      ]);

      loggedDev.likes.push(likedDev._id);

      await devModel.save();

      if (likedDev.likes.includes(loggedDev._id)) {
        console.log('Its a Match!!!');
      }
    } catch (error) {
      return res.status(404).json({ error: 'User does not exist.' });
    }
    return res.json(loggedDev);
  },
};
