const { Schema, model } = require('mongoose');

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
    matches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model('Dev', DevSchema);
