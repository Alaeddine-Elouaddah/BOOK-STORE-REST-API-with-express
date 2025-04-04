const mongoose = require('mongoose');
const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    image: {
      type: String,
      default: 'avatar.png',
    },
  },
  {
    timestamps: true,
  }
);
const Author = mongoose.model('Author', AuthorSchema);
module.exports = {
  Author,
};
