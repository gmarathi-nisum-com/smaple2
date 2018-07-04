const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

// Set user info from request
exports.setUserInfo = function setUserInfo(request) {
  const getUserInfo = {
    id: request._id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
    role: request.role,
    sex: request.sex,
    dob: request.dob
  };

  return getUserInfo;
};

// Set user info from request
exports.setPostInfo = function setPostInfo(request) {
  const getPostInfo = {
    _id: request._id,
    positive: request.positive,
    negative: request.negative,
    advice: request.advice
  };

  return getPostInfo;
};

// Set user fav info from request
exports.setUserFavInfo = function setUserFavInfo(request) {
  const getUserFavInfo = {
    _id: request._id,
    userId: request.userId,
    name: request.name,
    value: request.value,
    createdAt: request.createdAt,
    updatedAt:  request.updatedAt
  };

  return getUserFavInfo;
};

exports.getRole = function getRole(checkRole) {
  let role;

  switch (checkRole) {
    case ROLE_ADMIN: role = 4; break;
    case ROLE_OWNER: role = 3; break;
    case ROLE_CLIENT: role = 2; break;
    case ROLE_MEMBER: role = 1; break;
    default: role = 1;
  }

  return role;
};
