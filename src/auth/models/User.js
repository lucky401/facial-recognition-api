const mongoose = require('mongoose');

const User = mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        index: true,
        unique: true,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
      images: [
        {
          url: String,
          regions: [Object],
          createdAt: { type: Date, default: Date.now },
        },
      ],
    },
    { timestamps: true },
  ),
);

module.exports = User;
