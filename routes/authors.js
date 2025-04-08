const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Make sure this line is present

router.use(express.json());
const Joi = require('joi');
const { Author } = require('../models/Author');
const asyncHandler = require('express-async-handler');
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
} = require('../controllers/authorsController');

/**
 * @desc GET ALL AUTHORS
 * @router api/authors
 * @method GET
 * @acces public
 */

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);

router.post('/', createNewAuthor);

//

router.put('/:id', updateAuthor);

router.delete('/:id', deleteAuthor);
module.exports = router;
