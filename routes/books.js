const express = require('express');
const router = express.Router();
const { verifyTokenAndAdmin } = require('../middlewares/verifyToken');
const {
  getAllBooks,
  getBookByID,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

router.route('/').get(getAllBooks).post(verifyTokenAndAdmin, createBook);
router
  .route('/:id')
  .get(getBookByID)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;
