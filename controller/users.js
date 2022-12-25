const userService = require("../service/user");
const error = require("../utilities/error");
const authService = require("../service/auth");
// const User = require("../models/User");

const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);
    if (!user) {
      throw error("user not found", 404);
    }
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const postUser = async (req, res, next) => {
  const { name, email, password, roles, accountStatus } = req.body;

  try {
    const user = await authService.registerService({
      name,
      email,
      password,
      roles,
      accountStatus,
    });

    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

const postUserById = (req, res, next) => {};

const putUserById = (req, res, next) => {};

const patchUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { name, roles, accountStatus } = req.body;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("user not found", 404);
    }

    user.name = name ?? user.name;
    user.roles = roles ?? user.roles;
    user.accountStatus = accountStatus ?? user.roles;

    await user.save();

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await userService.findUserByProperty("_id", userId);

    if (!user) {
      throw error("user not found", 404);
    }

    await user.remove();
    return res.status(203).json({ message: "removed" });
  } catch (e) {
    let err = e;
    err.message = "already removed or not found";
    next(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  putUserById,
  patchUserById,
  deleteUserById,
};
