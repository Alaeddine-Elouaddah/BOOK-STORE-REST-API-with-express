const express = require('express');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { User, validateUpdateUser } = require('../models/User');
/**
 *@desc UPdate USer
 *@route /api/users/:id
 *@method PUT
 *@acces private
 */
module.exports.updateUser = asyncHandler(async (req, res) => {
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
});
/**
 * @desc GET ALL USERS
 * @route /api/users
 * @method GET
 * @acces private (only admin)
 */
module.exports.getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find().select('-password');
  res.status(200).json(user);
});
/**
 * @desc GET User By Id
 * @route /api/users/id
 * @method GET
 * @acces private (only admin & and user Him self  )
 */
module.exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not Found ' });
  }
});
/**
 * @desc Delete  User By Id
 * @route /api/users/id
 * @method DELETE
 * @acces private (only admin & and user Him self  )
 */
module.exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User has been  deleted by succes ' });
  } else {
    res.status(404).json({ message: 'User not found ' });
  }
});
