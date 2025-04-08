const express = require('express');
const router = express.Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require('../middlewares/verifyToken');
const {
  updateUser,
  getAllUser,
  getUserById,
} = require('../controllers/userController');

router.put('/:id', verifyTokenAndAdmin, updateUser);

router.get('/', verifyTokenAndAdmin, getAllUser);

router.get('/:id', verifyTokenAndAuthorization, getUserById);

router.delete('/:id', verifyTokenAndAuthorization);
module.exports = router;
