const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  sub: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },

  picture: {
    type: String,
    default:
      'https://i.pinimg.com/564x/74/46/9b/74469bd23df16c22231fcf75b7073fd2.jpg',
    optional: true,
  },

  // ??  optional fields

  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
    optional: 'true',
  },

  accountType: {
    type: String,
    default: 'free',
    optional: true,
  },
  firstName: {
    type: String,
    default: '',
    optional: true,
  },
  lastName: {
    type: String,
    default: '',
    optional: true,
  },

  contactNumber: {
    type: String,
    default: '',
    optional: true,
  },
  address: {
    type: String,
    default: '',
    optional: true,
  },
  city: {
    type: String,
    default: '',
    optional: true,
  },
  zipCode: {
    type: String,
    default: '',
    optional: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
