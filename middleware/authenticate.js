const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authenticate(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "unauthorised token" });
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, "secret-key");

    const user = await User.findById(decoded._id);

    if (!user) {
       res.status(401).json({ message: "unauthorised" });
    }

    req.user = user;
    next();
  } catch (e) {
    res.status(400).json({ message: "invalid token" });
  }
}

module.exports = authenticate;
