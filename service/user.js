const User = require("../models/User");

// multiple user find
const findUsers = () => {
  return User.find();
};

// single user find
const findUserByProperty = (key, value) => {
  if (key === "_id") {
    return User.findById(value);
  }
  return User.findOne({ [key]: value });
};

// create new user
const createNewUser = ({ name, email, password, roles, accountStatus }) => {
  const user = new User({
    name,
    email,
    password,
    roles: roles ? roles : ["STUDENT"],
    accountStatus: accountStatus ? accountStatus : "PENDING",
  });
  return user.save();
};

// update user
const updateUser = async (id, data) => {
  const user = await findUserByProperty("email", data.email);

  if (user) {
    throw error("email already in use", 404);
  }
  return User.findByIdAndUpdate(id, { ...data }, { new: true });
};

module.exports = {
  findUserByProperty,
  createNewUser,
  findUsers,
  updateUser,
};
