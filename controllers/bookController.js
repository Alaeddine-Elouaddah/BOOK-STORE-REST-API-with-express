const mongoose = require('mongoose');
const Joi = require('joi');
const asyncHandler = require('express-async-handler');
const { Book } = require('../models/Book');
const { Author } = require('../models/Author');

const getAllBooks = asyncHandler(async (req, res) => {
  //  Comparison Query Operators:
  // {$eq: 10}   ==> means "equal to 10"
  // {$ne: 10}   ==> means "not equal to 10"
  // {$lt: 10}   ==> means "less than 10"
  // {$lte: 10}  ==> means "less than or equal to 10"
  // {$gt: 10}   ==> means "greater than 10"
  // {$gte: 10}  ==> means "greater than or equal to 10"
  // {$in: [value1, value2, ...]} ==> means "matches any value in the given array of values"
  // {$nin: [value1, value2, ...]} ==> means "does not match any value in the given array of values"
  const { minPrice, maxPrice } = req.query;
  let books;
  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $lt: minPrice, $gt: maxPrice },
    }).populate('author', ['_id', 'userName', 'lastName']);
  } else {
    books = await Book.find().populate('author', [
      '_id',
      'userName',
      'lastName',
    ]);
  }
  res.status(200).json(books);
});
const getBookByID = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Vérifie si l'ID est un ObjectId valide
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid book ID format' });
  }

  const book = await Book.findById(id).populate('author', [
    '_id',
    'firstName',
    'lastName',
  ]);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});
// CREATE BOOKS
const createBook = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20).required(),
    author: Joi.string().required(),
    description: Joi.string().min(3).max(200).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid('soft cover', 'hard cover').required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const author = await Author.findById(req.body.author);
  if (!author) return res.status(404).json({ message: 'Author not found' });

  const book = new Book(req.body);
  const savedBook = await book.save();

  res.status(201).json({ message: 'Book created', book: savedBook });
});
// Update Book
const updateBook = asyncHandler(async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(20),
    author: Joi.string(),
    description: Joi.string().min(3).max(200),
    price: Joi.number().min(0),
    cover: Joi.string().valid('soft cover', 'hard cover'),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedBook) return res.status(404).json({ message: 'Book not found' });

  res.json({ message: 'Book updated', book: updatedBook });
});
//   Delete Book
const deleteBook = asyncHandler(async (req, res) => {
  const deletedBook = await Book.findByIdAndDelete(req.params.id);
  if (!deletedBook) return res.status(404).json({ message: 'Book not found' });

  res.json({ message: 'Book deleted successfully' });
});
module.exports = {
  getAllBooks,
  getBookByID,
  createBook,
  updateBook,
  deleteBook,
};
