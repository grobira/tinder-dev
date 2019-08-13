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
      const [likedDev, loggedDev] = await Promise.all([
        DevModel.findById(devId),
        DevModel.findById(user),
      ]);

      console.log(`Dev ${loggedDev.name} liked ${likedDev.name}`);
      loggedDev.likes.push(likedDev._id);

      await loggedDev.save();

      if (likedDev.likes.includes(loggedDev._id)) {
        console.log('its a match');
        const loggedSocket = req.connectedUsers[user];
        const targetSocket = req.connectedUsers[devId];

        if (loggedSocket) {
          console.log(`Enviando evento para dev ${loggedDev.name}`);
          req.io.to(loggedSocket).emit('match', DevDto(likedDev));
        }

        if (targetSocket) {
          console.log(`Enviando evento para dev ${likedDev.name}`);
          req.io.to(targetSocket).emit('match', DevDto(loggedDev));
        }
      }
      return res.json(DevDto(loggedDev));
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: 'User does not exist.' });
    }
  },
};
