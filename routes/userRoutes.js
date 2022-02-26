const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../model/userModel');
const { generateToken } = require('../utils/generateToken');
const { registrationValidation } = require('../validation/validate');
const { loginValidation } = require('../validation/validate');
const router = express.Router();

// Portfolio  Server Route V2
//
// ? get all userAccounts Details from the database

router.get(
  '/all',
  asyncHandler(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);

// ? get a all "free" userAccount Details from the database
router.get(
  '/free',
  asyncHandler(async (req, res, next) => {
    const users = await User.find({ accountType: 'free' });
    if (!users) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found',
      });
    }

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);
router.get(
  '/premium',
  asyncHandler(async (req, res, next) => {
    const users = await User.find({ accountType: 'premium' });
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users,
      },
    });
  })
);

//? get user AAccount Data by email
router.get(
  '/accountdata',
  asyncHandler(async (req, res, next) => {
    const { email } = req.body;
    console.log('req body' + req.body);
    console.log(req.body);

    const user = await User.findOne({ email });
    console.log(user);

    if (user) {
      res.status(200).json({
        allUserData: user,
      });
    }

    return res.status(404).json({
      message: 'User not found',
    });
  })
);

router.post(
  '/create',
  asyncHandler(async (req, res, next) => {
    console.log('/create route has been hit');
    console.log(req.body);
    const { email, sub, nickName, picture } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      // console.log('error existed');
      // const err = new Error('User already registered no need to create again');
      // err.status = 400;
      // next(err);
      res.status(200).json({
        status: 'fail',
        message: 'User already registered no need to create again',
      });
    }
    const user = await User.create({
      email,
      sub,
      nickName,
      picture,
    });
    if (user) {
      console.log('user created');
      res.json({
        status: 'success',
        message: 'User created successfully on first login',
        user,
      });
    }
  })
);

router.post(
  '/check',
  asyncHandler(async (req, res, next) => {
    console.log('/check route has been hit');
    console.log(req.body);
    const { email } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      // console.log('error existed');
      // const err = new Error('User already registered no need to create again');
      // err.status = 400;
      // next(err);
      res.status(200).json({
        status: 'success',
        message: 'user found',
        exist: true,
      });
    } else {
      res.status(200).json({
        status: 'fail',
        message: 'user not found',
      });
    }
  })
);

// ? update user data
router.patch(
  '/accountdata',
  asyncHandler(async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      address,
      city,
      zipCode,
    } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = email;
      user.contactNumber = contactNumber;
      user.address = address;
      user.city = city;
      user.zipCode = zipCode;
      await user.save();
      res.status(200).json({
        message: 'User updated',
      });
    }
    return res.status(404).json({
      message: 'User not found',
    });
  })
);

module.exports = router;
