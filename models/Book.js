const mongoose = require('mongoose');
const Joi = require('joi');
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String, // ❌ tu avais `string` au lieu de `String`
      required: true,
      minlength: 3,
      maxlength: 100,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Author',
    },
    description: {
      // ❌ il y avait une faute : "desccription"
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ['soft cover', 'hard cover'],
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };
