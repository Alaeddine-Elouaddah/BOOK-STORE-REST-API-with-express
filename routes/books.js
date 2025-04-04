const express = require('express');
const router = express.Router();
const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const { Book } = require('../models/Book');
const { Author } = require('../models/Author');

// GET ALL BOOKS
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const books = await Book.find().populate('author', [
      '_id',
      'firstName',
      'lastName',
    ]);
    res.json(books);
  })
);

// GET BOOK BY ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author', [
      '_id',
      'firstName',
      'lastName',
    ]);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  })
);

// CREATE BOOK
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(20).required(),
      author: Joi.string().required(),
      description: Joi.string().min(3).max(200).required(),
      price: Joi.number().min(0).required(),
      cover: Joi.string().valid('soft cover', 'hard cover').required(),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const author = await Author.findById(req.body.author);
    if (!author) return res.status(404).json({ message: 'Author not found' });

    const book = new Book(req.body);
    const savedBook = await book.save();

    res.status(201).json({ message: 'Book created', book: savedBook });
  })
);

// UPDATE BOOK
router.put(
  '/:id',
  asyncHandler(async (req, res) => {
    const schema = Joi.object({
      title: Joi.string().min(3).max(20),
      author: Joi.string(),
      description: Joi.string().min(3).max(200),
      price: Joi.number().min(0),
      cover: Joi.string().valid('soft cover', 'hard cover'),
    });

    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedBook)
      return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book updated', book: updatedBook });
  })
);

// DELETE BOOK
router.delete(
  '/:id',
  asyncHandler(async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted successfully' });
  })
);

module.exports = router;
