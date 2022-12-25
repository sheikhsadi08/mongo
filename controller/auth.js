const { registerService, loginService } = require("../service/auth");

// -----------------------register controller------------------------//
const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // validation check
  if (!name || !email || !password) {
    return res.status(404).json({ message: "invalid input" });
  }

  try {
    const user = await registerService({ name, email, password });
    return res.status(201).json({ message: "user created successfully", user });
  } catch (e) {
    next(e);
  }
};

// ------------------------login controller-------------------------//
const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const token = await loginService({ email, password });
    return res.status(200).json({ message: "login successful", token });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  loginController,
  registerController,
};
