//Author: Nikita Kothari

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({
      message: "Missing Authentication Error",
      success: false,
    });
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      message: "Authentication Error",
      success: false,
    });
  }
  const user = await User.findById(decodedToken._id).lean();
  delete user.password;
  delete user.__v;
  req.user = user;
  next();
};

module.exports = isAuthenticated;
