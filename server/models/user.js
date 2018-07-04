// Importing Node packages required for schema
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const ROLE_MEMBER = require('../constants').ROLE_MEMBER;
const ROLE_CLIENT = require('../constants').ROLE_CLIENT;
const ROLE_OWNER = require('../constants').ROLE_OWNER;
const ROLE_ADMIN = require('../constants').ROLE_ADMIN;

const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    index:true
  },
  password: {
    type: String
  },
  isVerified: { type: Boolean, default: false },
    firstName: { type: String },
    lastName: { type: String },
    sex:{
      type: String
    },
    dob:{
      type: String
    },
  role: {
    type: String,
    enum: [ROLE_MEMBER, ROLE_CLIENT, ROLE_OWNER, ROLE_ADMIN],
    default: ROLE_MEMBER
  },
  img:{data: Buffer, contentType: String, contentLength: String},
  likeposts: { type: [String]},
  following: {type : Number},
  followers: {type: Number},
  category: {type: String},
  friends :{type: [String]}, 
  ranking : {type: Number, default: 1200},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now},
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
},
  {
    timestamps: true
  });

//= ===============================
// User ORM Methods
//= ===============================

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', function (next) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Method to compare password for login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
