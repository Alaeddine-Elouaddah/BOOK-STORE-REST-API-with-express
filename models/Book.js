const { string, required } = require('joi');
const mongoose = require('mongoose');
const bookSchema = mongoose.Schema(
  {
    title: {
      type: string,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    description: {},
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model('Book', bookSchema);
module.exports = {
  Book,
};
