const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByProperty, createNewUser } = require("./user");
const error = require("../utilities/error");

// ------------------register service------------------
const registerService = async ({
  name,
  email,
  password,
  roles,
  accountStatus,
}) => {
  let user = await findUserByProperty("email", email);

  if (user) throw error("user already exist", 400);

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return createNewUser({ name, email, password: hash, roles, accountStatus });
};

// ------------------login service---------------------
const loginService = async ({ email, password }) => {
  const user = await findUserByProperty("email", email);

  if (!user) throw error("invalid credential", 400);

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    const error = new Error("invalid credential");
    error.status = 400;
    throw error;
  }

  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    roles: user.roles,
    accountStatus: user.accountStatus,
  };

  //  create and return token
  return jwt.sign(payload, "secret-key", { expiresIn: "2h" });
};

module.exports = {
  registerService,
  loginService,
};
