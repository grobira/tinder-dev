module.exports = {
  DevDto: dev => {
    return {
      _id: dev._id,
      username: dev.username,
      name: dev.name,
      bio: dev.bio,
      avatar: dev.avatar,
    };
  },
};
