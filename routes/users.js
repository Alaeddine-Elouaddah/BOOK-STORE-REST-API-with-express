const express = require('express');
const asyncHandler = require('express-async-handler');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { User, validateUpdateUser } = require('../models/User');
const { verifyToken } = require('../middlewares/verifyToken');
/**
 *@desc UPdate USer
 *@route /api/users/:id
 *@method PUT
 *@acces private
 */

router.put(
  '/:id',
  verifyToken,
  asyncHandler(async (req, res) => {
    if (req.user.id !== req.params.id) {
      return res
        .status(403) //forbidden
        .json({
          message: 'You are not allowed , you cam only update ur profile',
        });
    }
    const { error } = validateUpdateUser(req.body);
    if (error) {
      return res.status(400).json({ mssage: error.details[0].message });
    }
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          email: req.body.email,
          password: req.body.password,
          username: req.body.username,
        },
      },
      { new: true }
    ).select('-password');
    res.status(200).json(updateUser);
  })
);
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
  })
);
module.exports = router;
